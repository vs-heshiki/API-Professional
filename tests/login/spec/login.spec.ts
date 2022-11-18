import { LoginController } from '../../../src/presentation/controller/login/login'
import { HttpRequest, Authenticate, Validator } from '../../../src/presentation/controller/login/loginProtocols'
import { MissingParamError, ServerError } from '../../../src/presentation/errors'
import { badRequest, serverError, success, unauthorized } from '../../../src/presentation/helpers/httpHelpers'

const newFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password'
    }
})

const newAuthenticate = (): Authenticate => {
    class AuthenticateStub implements Authenticate {
        async auth (email: string, password: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new AuthenticateStub()
}

const newValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate (input: any): Error {
            return null
        }
    }
    return new ValidatorStub()
}

interface SutTypes {
    sut: LoginController
    authenticateStub: Authenticate
    validatorStub: Validator
}

const newSut = (): SutTypes => {
    const validatorStub = newValidator()
    const authenticateStub = newAuthenticate()
    const sut = new LoginController(validatorStub, authenticateStub)
    return {
        sut,
        validatorStub,
        authenticateStub
    }
}

describe('Login Controller', () => {
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

    test('Should return 500 if Authenticate throws', async () => {
        const { sut, authenticateStub } = newSut()
        jest.spyOn(authenticateStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut } = newSut()
        const response = await sut.handle(newFakeRequest())
        expect(response).toEqual(success({ accessToken: 'any_token' }))
    })

    test('Should call Validator with correct values', async () => {
        const { sut, validatorStub } = newSut()
        const validateSpyOn = jest.spyOn(validatorStub, 'validate')
        const httpRequest = newFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpyOn).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if Validator return an error', async () => {
        const { sut, validatorStub } = newSut()
        jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_value'))
        const httpRequest = await sut.handle(newFakeRequest())
        expect(httpRequest).toEqual(badRequest(new MissingParamError('any_value')))
    })
})
