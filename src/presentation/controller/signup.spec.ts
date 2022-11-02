import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { AddAccount, AddAccountModel, AccountModel, EmailValidator } from './signUp/signUpProtocols'

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    addAccountStub: AddAccount
}
const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add (account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'anyId_valid',
                name: 'anyName_valid',
                email: 'any_valid@email.com',
                password: 'anyPassword_valid'
            }
            return new Promise(resolve => resolve(fakeAccount))
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
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
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
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
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
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
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
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'))
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
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('confirmPassword'))
    })

    test('Should return 400 if an invalid email is provided', async () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'invalid_email@email.com',
                password: 'anyPassword',
                confirmPassword: 'anyPassword'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })

    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = newSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any_email@email.com',
                password: 'anyPassword',
                confirmPassword: 'anyPassword'
            }
        }
        await sut.handle(httpRequest)
        expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should return 500 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any_email@email.com',
                password: 'anyPassword',
                confirmPassword: 'anyPassword'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountStub } = newSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any_email@email.com',
                password: 'anyPassword',
                confirmPassword: 'anyPassword'
            }
        }
        await sut.handle(httpRequest)
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
        const httpRequest = {
            body: {
                name: 'anyName',
                email: 'any_email@email.com',
                password: 'anyPassword',
                confirmPassword: 'anyPassword'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should return 201 if valid data is provider', async () => {
        const { sut } = newSut()
        const httpRequest = {
            body: {
                name: 'anyName_valid',
                email: 'any_valid@email.com',
                password: 'anyPassword_valid',
                confirmPassword: 'anyPassword_valid'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(201)
        expect(httpResponse.body).toEqual({
            id: 'anyId_valid',
            name: 'anyName_valid',
            email: 'any_valid@email.com',
            password: 'anyPassword_valid'
        })
    })
})
