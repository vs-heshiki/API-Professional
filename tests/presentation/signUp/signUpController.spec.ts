import { SignUpController } from '@/presentation/controller/login/signUp/signUpController'
import { MissingParamError, ServerError, EmailAlreadyTaken } from '@/presentation/errors'
import { badRequest, serverError, success, forbidden } from '@/presentation/helpers/http/httpHelpers'
import { mockSignUpRequest, throwError } from '@/tests/mocks'
import { AddAccountSpy } from '@/tests/presentation/signUp/stubs/signUpStubs'
import { AuthenticateSpy, ValidatorSpy } from '@/tests/validations/validator/stubs/validatorStubs'

type SutTypes = {
    sut: SignUpController
    addAccountSpy: AddAccountSpy
    validatorSpy: ValidatorSpy
    authenticateSpy: AuthenticateSpy
}

const newSut = (): SutTypes => {
    const addAccountSpy = new AddAccountSpy()
    const validatorSpy = new ValidatorSpy()
    const authenticateSpy = new AuthenticateSpy()
    const sut = new SignUpController(addAccountSpy, validatorSpy, authenticateSpy)
    return {
        sut,
        addAccountSpy,
        validatorSpy,
        authenticateSpy
    }
}

describe('SignUp Controller', () => {
    const request = mockSignUpRequest()

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountSpy } = newSut()
        await sut.handle(request)
        expect(addAccountSpy.accountParams).toEqual({
            name: request.name,
            email: request.email,
            password: request.password
        })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountSpy } = newSut()
        jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return an access token if valid data is provider', async () => {
        const { sut, authenticateSpy } = newSut()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(success(authenticateSpy.authModel))
    })

    test('Should return 403 if AddAccount returns null', async () => {
        const { sut, addAccountSpy } = newSut()
        addAccountSpy.accountModel = null
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(forbidden(new EmailAlreadyTaken()))
    })

    test('Should call Validator with correct values', async () => {
        const { sut, validatorSpy } = newSut()
        await sut.handle(request)
        expect(validatorSpy.input).toEqual(request)
    })

    test('Should return 400 if Validator return an error', async () => {
        const { sut, validatorSpy } = newSut()
        validatorSpy.resolve = new MissingParamError('*!*!*!*')
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(badRequest(validatorSpy.resolve))
    })

    test('Should call Authenticator with correct values', async () => {
        const { sut, authenticateSpy } = newSut()
        await sut.handle(request)
        expect(authenticateSpy.authParams).toEqual({
            email: request.email,
            password: request.password
        })
    })

    test('Should return 500 if Authenticate throws', async () => {
        const { sut, authenticateSpy } = newSut()
        jest.spyOn(authenticateSpy, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSignUpRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })
})
