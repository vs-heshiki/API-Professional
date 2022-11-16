import { ServerError } from './../../../presentation/errors/serverError'
import { InvalidParamError } from './../../../presentation/errors/invalidParamError'
import { HttpRequest } from './../../../presentation/protocols/http'
import { EmailValidator } from './../../../presentation/protocols/emailValidator'
import { MissingParamError } from './../../../presentation/errors/missingParamError'
import { badRequest, serverError } from './../../../presentation/helpers/httpHelpers'
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

    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = newSut()
        const isValidSpyOn = jest.spyOn(emailValidatorStub, 'isValid')
        await sut.handle(newFakeRequest())
        expect(isValidSpyOn).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should return 400 if invalid email is provided', async () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    test('Should return 500 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })
})
