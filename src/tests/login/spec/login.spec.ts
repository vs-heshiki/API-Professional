import { LoginController } from '../../../presentation/controller/login/login'
import { HttpRequest, Authenticate, EmailValidator } from '../../../presentation/controller/login/loginProtocols'
import { MissingParamError, InvalidParamError, ServerError } from './../../../presentation/errors'
import { badRequest, serverError, unauthorized } from './../../../presentation/helpers/httpHelpers'

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

const newAuthenticate = (): Authenticate => {
    class AuthenticateStub implements Authenticate {
        async auth (email: string, password: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new AuthenticateStub()
}

interface SutTypes {
    sut: LoginController
    emailValidatorStub: EmailValidator
    authenticateStub: Authenticate
}

const newSut = (): SutTypes => {
    const emailValidatorStub = newEmailValidator()
    const authenticateStub = newAuthenticate()
    const sut = new LoginController(emailValidatorStub, authenticateStub)
    return {
        sut,
        emailValidatorStub,
        authenticateStub
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

    test('Should call Authenticate with correct values', async () => {
        const { sut, authenticateStub } = newSut()
        const authSpyOn = jest.spyOn(authenticateStub, 'auth')
        await sut.handle(newFakeRequest())
        expect(authSpyOn).toHaveBeenCalledWith('any_email@email.com', 'any_password')
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticateStub } = newSut()
        jest.spyOn(authenticateStub, 'auth')
            .mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(unauthorized())
    })
})
