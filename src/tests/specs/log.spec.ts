import { LogControllerDecorator } from '../../main/decorators/log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
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

        const controllerStub = new ControllerStub()
        const sut = new LogControllerDecorator(controllerStub)
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
