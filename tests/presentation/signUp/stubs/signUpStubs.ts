import { AddAccount, Authenticate } from '@/domain/usecases/account/useCasesAccountProtocols'
import { EmailValidator } from '@/validations/protocols/emailValidator'
import { Validator } from '@/validations/protocols/validator'
import { mockAccount } from '@/tests/mocks'

export const mockAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        async add (account: AddAccount.Params): Promise<AddAccount.Model> {
            return Promise.resolve(mockAccount())
        }
    }
    return new AddAccountStub()
}

export const mockValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate (input: any): Error | null {
            return null
        }
    }
    return new ValidatorStub()
}

export const mockAuthenticate = (): Authenticate => {
    class AuthenticateStub implements Authenticate {
        async auth (authenticate: Authenticate.Params): Promise<Authenticate.Model> {
            return Promise.resolve({ accessToken: 'any_token', name: 'any_name' })
        }
    }
    return new AuthenticateStub()
}

export const mockEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}
