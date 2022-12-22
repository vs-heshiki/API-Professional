import { EmailValidator } from '@/validations/validators/validatorProtocols'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
    isValid (email: string): boolean {
        return validator.isEmail(email)
    }
}
