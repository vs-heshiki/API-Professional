import { SignUpController } from '@/presentation/controller/login/signUp/signUpController'
import { AddAccount, Authenticate } from '@/presentation/controller/login/signUp/signUpControllerProtocols'
import { MissingParamError, ServerError, EmailAlreadyTaken } from '@/presentation/errors'
import { badRequest, serverError, success, forbidden } from '@/presentation/helpers/http/httpHelpers'
import { mockSignUpRequest, throwError } from '@/tests/mocks'
import { mockAddAccount, mockAuthenticate,mockValidator } from '@/tests/presentation/signUp/stubs/signUpStubs'
import { Validator } from '@/validations/protocols/validator'

type SutTypes = {
    sut: SignUpController
    addAccountStub: AddAccount
    validatorStub: Validator
    authenticateStub: Authenticate
}

const newSut = (): SutTypes => {
    const addAccountStub = mockAddAccount()
    const validatorStub = mockValidator()
    const authenticateStub = mockAuthenticate()
    const sut = new SignUpController(addAccountStub, validatorStub, authenticateStub)
    return {
        sut,
        addAccountStub,
        validatorStub,
        authenticateStub
    }
}

describe('SignUp Controller', () => {
    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountStub } = newSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        await sut.handle(mockSignUpRequest())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_mail@email.com',
            password: 'any_password'
        })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = newSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSignUpRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return an access token if valid data is provider', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(mockSignUpRequest())
        expect(httpResponse).toEqual(success({ accessToken: 'any_token', name: 'any_name' }))
    })

    test('Should return 403 if AddAccount returns null', async () => {
        const { sut, addAccountStub } = newSut()
        jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(null)
        const httpResponse = await sut.handle(mockSignUpRequest())
        expect(httpResponse).toEqual(forbidden(new EmailAlreadyTaken()))
    })

    test('Should call Validator with correct values', async () => {
        const { sut, validatorStub } = newSut()
        const validateSpyOn = jest.spyOn(validatorStub, 'validate')
        const request = mockSignUpRequest()
        await sut.handle(request)
        expect(validateSpyOn).toHaveBeenCalledWith(request)
    })

    test('Should return 400 if Validator return an error', async () => {
        const { sut, validatorStub } = newSut()
        jest.spyOn(validatorStub, 'validate')
            .mockReturnValueOnce(new MissingParamError('any_value'))
        const request = await sut.handle(mockSignUpRequest())
        expect(request).toEqual(badRequest(new MissingParamError('any_value')))
    })

    test('Should call Authenticator with correct values', async () => {
        const { sut, authenticateStub } = newSut()
        const authSpyOn = jest.spyOn(authenticateStub, 'auth')
        await sut.handle(mockSignUpRequest())
        expect(authSpyOn).toHaveBeenCalledWith({
            email: 'any_mail@email.com',
            password: 'any_password'
        })
    })

    test('Should return 500 if Authenticate throws', async () => {
        const { sut, authenticateStub } = newSut()
        jest.spyOn(authenticateStub, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSignUpRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })
})
