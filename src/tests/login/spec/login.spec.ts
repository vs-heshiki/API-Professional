import { MissingParamError } from './../../../presentation/errors/missingParamError'
import { badRequest } from './../../../presentation/helpers/httpHelpers'
import { LoginController } from '../../../presentation/controller/signUp/login'

describe('Login Controller', () => {
    test('Should return 400 if no email is provided', async () => {
        const sut = new LoginController()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })
})
