import { LogErrorRepository } from '@/data/protocols/db/logErrorRepository'
import { LogControllerDecorator } from '@/main/decorators/logControllerDecorator'
import { serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { mockController, mockErrLogRepo } from '@/tests/infra/mongodb/stubs/mongoDbStubs'
import { mockAccount, mockAccountRequest } from '@/tests/mocks'

const newFakeServerError = (): HttpResponse => {
    const err = new Error()
    err.stack = 'any_stack'
    return serverError(err)
}

interface sutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepo: LogErrorRepository
}

const newSut = (): sutTypes => {
    const controllerStub = mockController()
    const logErrorRepo = mockErrLogRepo()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepo)
    return { sut, controllerStub, logErrorRepo }
}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const { sut, controllerStub } = newSut()
        const handleSpyOn = jest.spyOn(controllerStub, 'handle')
        await sut.handle(mockAccountRequest())
        expect(handleSpyOn).toHaveBeenCalledWith(mockAccountRequest())
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(mockAccountRequest())
        expect(httpResponse).toEqual(success(mockAccount()))
    })

    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorRepo } = newSut()
        const logSpyOn = jest.spyOn(logErrorRepo, 'logError')
        jest.spyOn(controllerStub, 'handle')
            .mockReturnValueOnce(Promise.resolve(newFakeServerError()))
        await sut.handle(mockAccountRequest())
        expect(logSpyOn).toHaveBeenCalledWith('any_stack')
    })
})
