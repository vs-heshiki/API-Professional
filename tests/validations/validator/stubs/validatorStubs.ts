import { EmailValidator } from '@/validations/protocols/emailValidator'
import { Validator } from '@/validations/protocols/validator'

export const mockValidator = (): Validator => {
    class ValidationStub implements Validator {
        validate (input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

export const mockEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}
