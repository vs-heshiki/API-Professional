import { LogControllerDecorator } from '../../src/main/decorators/logControllerDecorator'
import { AccountModel } from '../../src/domain/model/accountModel'
import { serverError, success } from '../../src/presentation/helpers/http/httpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../src/presentation/protocols'
import { LogErrorRepository } from '../../src/data/protocols/db'

const newFakeRequest = (): HttpRequest => ({
    body: {
        name: 'anyName',
        email: 'any_email@email.com',
        password: '12345',
        confirmPassword: '12345'
    }
})

const newFakeAccount = (): AccountModel => ({
    id: 'anyId_valid',
    name: 'anyName_valid',
    email: 'any_valid@email.com',
    password: 'anyPassword_valid'
})

const newFakeServerError = (): HttpResponse => {
    const err = new Error()
    err.stack = 'any_stack'
    return serverError(err)
}

const newController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            return new Promise(resolve => resolve(success(newFakeAccount())))
        }
    }
    return new ControllerStub()
}

const newErrLogRepo = (): LogErrorRepository => {
    class LogErrorRepoStub implements LogErrorRepository {
        async logError (stack: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new LogErrorRepoStub()
}

interface sutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepo: LogErrorRepository
}

const newSut = (): sutTypes => {
    const controllerStub = newController()
    const logErrorRepo = newErrLogRepo()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepo)
    return { sut, controllerStub, logErrorRepo }
}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const { sut, controllerStub } = newSut()
        const handleSpyOn = jest.spyOn(controllerStub, 'handle')
        await sut.handle(newFakeRequest())
        expect(handleSpyOn).toHaveBeenCalledWith(newFakeRequest())
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(success(newFakeAccount()))
    })

    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorRepo } = newSut()
        const logSpyOn = jest.spyOn(logErrorRepo, 'logError')
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(newFakeServerError())))
        await sut.handle(newFakeRequest())
        expect(logSpyOn).toHaveBeenCalledWith('any_stack')
    })
})
