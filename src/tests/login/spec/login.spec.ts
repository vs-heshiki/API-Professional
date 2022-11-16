import { MissingParamError } from './../../../presentation/errors/missingParamError'
import { badRequest } from './../../../presentation/helpers/httpHelpers'
import { LoginController } from '../../../presentation/controller/signUp/login'

interface SutTypes {
    sut: LoginController
}

const newSut = (): SutTypes => {
    const sut = new LoginController()
    return {
        sut
    }
}

describe('Login Controller', () => {
    test('Should return 400 if no email is provided', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })

    test('Should return 400 if no password is provided', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                email: 'any_email@email.com'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
    })
})
