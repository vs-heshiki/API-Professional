import { LogControllerDecorator } from '../../main/decorators/log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

interface sutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
}

const newController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {
                    name: 'anyName',
                    email: 'any_email@email.com',
                    password: '12345',
                    confirmPassword: '12345'
                }
            }
            return new Promise(resolve => resolve(httpResponse))
        }
    }
    return new ControllerStub()
}

const newSut = (): sutTypes => {
    const controllerStub = newController()
    const sut = new LogControllerDecorator(controllerStub)
    return { sut, controllerStub }
}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const { sut, controllerStub } = newSut()
        const handleSpyOn = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any_email@email.com',
                password: '12345',
                confirmPassword: '12345'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpyOn).toHaveBeenCalledWith(httpRequest)
    })
})
