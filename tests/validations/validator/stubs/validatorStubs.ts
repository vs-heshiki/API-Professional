import { Authenticate } from '@/domain/usecases/account/authenticate'
import { EmailValidator } from '@/validations/protocols/emailValidator'
import { Validator } from '@/validations/protocols/validator'
import { faker } from '@faker-js/faker'

export class ValidatorSpy implements Validator {
    input: any
    resolve = null

    validate (input: any): Error | null {
        this.input = input
        return this.resolve
    }
}

export const mockValidator = (): Validator => {
    class ValidationStub implements Validator {
        validate (input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

export class AuthenticateSpy implements Authenticate {
    authParams: Authenticate.Params
    authModel = {
        accessToken: faker.datatype.uuid(),
        name: faker.internet.userName()
    }

    async auth (authenticate: Authenticate.Params): Promise<Authenticate.Model> {
        this.authParams = authenticate
        return this.authModel
    }
}

export const mockEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}
