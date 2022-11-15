import { LogErrorRepository } from '../../data/usecases/protocols/logErrorRepository'
import { LogControllerDecorator } from '../../main/decorators/log'
import { serverError } from '../../presentation/helpers/httpHelpers'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

const newFakeRequest = (): HttpRequest => ({
    body: {
        name: 'anyName',
        email: 'any_email@email.com',
        password: '12345',
        confirmPassword: '12345'
    }
})

const newController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {
                    name: 'other_any_name'
                }
            }
            return new Promise(resolve => resolve(httpResponse))
        }
    }
    return new ControllerStub()
}

const newErrLogRepo = (): LogErrorRepository => {
    class LogErrorRepoStub implements LogErrorRepository {
        async log (stack: string): Promise<void> {
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
        const httpRequest = newFakeRequest()
        await sut.handle(httpRequest)
        expect(handleSpyOn).toHaveBeenCalledWith(httpRequest)
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = newSut()
        const httpRequest = newFakeRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'other_any_name'
            }
        })
    })

    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorRepo } = newSut()
        const err = new Error()
        err.stack = 'any_stack'
        const svError = serverError(err)
        const logSpyOn = jest.spyOn(logErrorRepo, 'log')
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(svError)))
        const httpRequest = newFakeRequest()
        await sut.handle(httpRequest)
        expect(logSpyOn).toHaveBeenCalledWith('any_stack')
    })
})
