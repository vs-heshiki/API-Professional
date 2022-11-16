import { HttpRequest } from '../../../presentation/protocols/http'
import { SignUpController } from '../../../presentation/controller/signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../../presentation/errors'
import { AddAccount, AddAccountModel, AccountModel, EmailValidator } from '../../../presentation/controller/signUp/signUpProtocols'
import { badRequest, serverError, success } from '../../../presentation/helpers/httpHelpers'

const newFakeRequest = (): HttpRequest => ({
    body: {
        name: 'anyName',
        email: 'any_email@email.com',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
    }
})

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const newFakeAccount = (): AccountModel => ({
    id: 'anyId_valid',
    name: 'anyName_valid',
    email: 'any_valid@email.com',
    password: 'anyPassword_valid'
})

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add (account: AddAccountModel): Promise<AccountModel> {
            return new Promise(resolve => resolve(newFakeAccount()))
        }
    }
    return new AddAccountStub()
}

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    addAccountStub: AddAccount
}

const newSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const addAccountStub = makeAddAccount()
    const sut = new SignUpController(emailValidatorStub, addAccountStub)
    return {
        sut,
        emailValidatorStub,
        addAccountStub
    }
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                email: 'any@email.com',
                password: 'anyPassword',
                confirmPassword: 'anyPassword'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    })

    test('Should return 400 if no email is provided', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                name: 'anyName',
                password: 'anyPassword',
                confirmPassword: 'anyPassword'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })

    test('Should return 400 if no password is provided', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any@email.com',
                confirmPassword: 'anyPassword'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
    })

    test('Should return 400 if no password confirmation is provided', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any@email.com',
                password: 'anyPassword'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('confirmPassword')))
    })

    test('Should return 400 if password confirmation is not equal password', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any@email.com',
                password: 'anyPassword',
                confirmPassword: 'Password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('confirmPassword')))
    })

    test('Should return 400 if an invalid email is provided', async () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = newSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        await sut.handle(newFakeRequest())
        expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should return 500 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountStub } = newSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        await sut.handle(newFakeRequest())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'anyName',
            email: 'any_email@email.com',
            password: 'anyPassword'
        })
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = newSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if valid data is provider', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(success(newFakeAccount()))
    })
})