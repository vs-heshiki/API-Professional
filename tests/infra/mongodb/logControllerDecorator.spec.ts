import { LogControllerDecorator } from '@/main/decorators/logControllerDecorator'
import { serverError } from '@/presentation/helpers/http/httpHelpers'
import { HttpResponse } from '@/presentation/protocols'
import { ControllerSpy, LogErrorRepositorySpy } from '@/tests/infra/mongodb/spy/mongoDbSpy'
import { mockSignInRequest } from '@/tests/mocks'

const newFakeServerError = (): HttpResponse => {
    const err = new Error()
    err.stack = 'any_stack'
    return serverError(err)
}

interface sutTypes {
    sut: LogControllerDecorator
    controllerSpy: ControllerSpy
    logErrorRepositorySpy: LogErrorRepositorySpy
}

const newSut = (): sutTypes => {
    const controllerSpy = new ControllerSpy()
    const logErrorRepositorySpy = new LogErrorRepositorySpy()
    const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
    return { sut, controllerSpy, logErrorRepositorySpy }
}

describe('LogController Decorator', () => {
    const request = mockSignInRequest()

    test('Should call controller handle', async () => {
        const { sut, controllerSpy } = newSut()
        await sut.handle(request)
        expect(controllerSpy.request).toEqual(request)
    })

    test('Should return the same result of the controller', async () => {
        const { sut, controllerSpy } = newSut()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(controllerSpy.response)
    })

    test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerSpy, logErrorRepositorySpy } = newSut()
        const error = newFakeServerError()
        jest.spyOn(controllerSpy, 'handle')
            .mockReturnValueOnce(Promise.resolve(error))
        const httpResponse = await sut.handle(request)
        expect(logErrorRepositorySpy.stack).toBe(httpResponse.body.stack)
    })
})
