import { InvalidParamError } from '../../presentation/errors/invalidParamError'
import { EmailValidator } from '../protocols/emailValidator'
import { Validator } from '../../presentation/protocols/validator'

export class ValidatorEmail implements Validator {
    constructor (
        private readonly input: string,
        private readonly emailValidator: EmailValidator
    ) {}

    validate (input: any): Error {
        const isValid = this.emailValidator.isValid(input[this.input])
        if (!isValid) {
            return new InvalidParamError(this.input)
        }
    }
}
