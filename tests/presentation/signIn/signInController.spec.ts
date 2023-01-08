import { SignInController } from '@/presentation/controller/login/signIn/signInController'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelpers'
import { mockSignInRequest, throwError } from '@/tests/mocks'
import { AuthenticateSpy, ValidatorSpy } from '@/tests/validations/validator/stubs/validatorStubs'

type SutTypes = {
    sut: SignInController
    authenticateSpy: AuthenticateSpy
    validatorSpy: ValidatorSpy
}

const newSut = (): SutTypes => {
    const validatorSpy = new ValidatorSpy()
    const authenticateSpy = new AuthenticateSpy()
    const sut = new SignInController(authenticateSpy, validatorSpy)
    return {
        sut,
        validatorSpy,
        authenticateSpy
    }
}

describe('SignIn Controller', () => {
    const request = mockSignInRequest()

    test('Should call Authenticate with correct values', async () => {
        const { sut, authenticateSpy } = newSut()
        await sut.handle(request)
        expect(authenticateSpy.authParams).toEqual({
            email: request.email,
            password: request.password
        })
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticateSpy } = newSut()
        authenticateSpy.authModel = null
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(unauthorized())
    })

    test('Should return 500 if Authenticate throws', async () => {
        const { sut, authenticateSpy } = newSut()
        jest.spyOn(authenticateSpy, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut, authenticateSpy } = newSut()
        const response = await sut.handle(request)
        expect(response).toEqual(success(authenticateSpy.authModel))
    })

    test('Should call Validator with correct values', async () => {
        const { sut, validatorSpy } = newSut()
        await sut.handle(request)
        expect(request).toEqual(validatorSpy.input)
    })

    test('Should return 400 if Validator return an error', async () => {
        const { sut, validatorSpy } = newSut()
        validatorSpy.resolve = new MissingParamError('*!*!*!*')
        const request = await sut.handle(mockSignInRequest())
        expect(request).toEqual(badRequest(validatorSpy.resolve))
    })
})
