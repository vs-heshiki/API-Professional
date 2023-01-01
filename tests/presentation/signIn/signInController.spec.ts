import { SignInController } from '@/presentation/controller/login/signIn/signInController'
import { Authenticate } from '@/presentation/controller/login/signIn/signInControllerProtocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelpers'
import { Validator } from '@/validations/protocols/validator'
import { mockAccountRequest, throwError } from '@/tests/mocks'
import { mockValidator, mockAuthenticate } from '@/tests/presentation/signIn/stubs/signInStubs'

type SutTypes = {
    sut: SignInController
    authenticateStub: Authenticate
    validatorStub: Validator
}

const newSut = (): SutTypes => {
    const validatorStub = mockValidator()
    const authenticateStub = mockAuthenticate()
    const sut = new SignInController(authenticateStub, validatorStub)
    return {
        sut,
        validatorStub,
        authenticateStub
    }
}

describe('SignIn Controller', () => {
    test('Should call Authenticate with correct values', async () => {
        const { sut, authenticateStub } = newSut()
        const authSpyOn = jest.spyOn(authenticateStub, 'auth')
        await sut.handle(mockAccountRequest())
        expect(authSpyOn).toHaveBeenCalledWith({ email: 'any_mail@email.com', password: 'any_password' })
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticateStub } = newSut()
        jest.spyOn(authenticateStub, 'auth')
            .mockReturnValueOnce(null)
        const httpResponse = await sut.handle(mockAccountRequest())
        expect(httpResponse).toEqual(unauthorized())
    })

    test('Should return 500 if Authenticate throws', async () => {
        const { sut, authenticateStub } = newSut()
        jest.spyOn(authenticateStub, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockAccountRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut } = newSut()
        const response = await sut.handle(mockAccountRequest())
        expect(response).toEqual(success({ accessToken: 'any_token', name: 'any_name' }))
    })

    test('Should call Validator with correct values', async () => {
        const { sut, validatorStub } = newSut()
        const validateSpyOn = jest.spyOn(validatorStub, 'validate')
        const httpRequest = mockAccountRequest()
        await sut.handle(httpRequest)
        expect(validateSpyOn).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if Validator return an error', async () => {
        const { sut, validatorStub } = newSut()
        jest.spyOn(validatorStub, 'validate')
            .mockReturnValueOnce(new MissingParamError('any_value'))
        const httpRequest = await sut.handle(mockAccountRequest())
        expect(httpRequest).toEqual(badRequest(new MissingParamError('any_value')))
    })
})
