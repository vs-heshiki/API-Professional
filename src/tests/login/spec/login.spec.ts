import { HttpRequest } from './../../../presentation/protocols/http'
import { EmailValidator } from './../../../presentation/protocols/emailValidator'
import { MissingParamError } from './../../../presentation/errors/missingParamError'
import { badRequest } from './../../../presentation/helpers/httpHelpers'
import { LoginController } from '../../../presentation/controller/signUp/login'

const newFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password'
    }
})

const newEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

interface SutTypes {
    sut: LoginController
    emailValidatorStub: EmailValidator
}

const newSut = (): SutTypes => {
    const emailValidatorStub = newEmailValidator()
    const sut = new LoginController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
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

    test('Should call Email Validator with correct email', async () => {
        const { sut, emailValidatorStub } = newSut()
        const isValidSpyOn = jest.spyOn(emailValidatorStub, 'isValid')
        await sut.handle(newFakeRequest())
        expect(isValidSpyOn).toHaveBeenCalledWith('any_email@email.com')
    })
})