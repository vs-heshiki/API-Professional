import { InvalidParamError } from './../../errors/invalidParamError'
import { EmailValidator } from './../../protocols/emailValidator'
import { Validator } from './../../protocols/validator'

export class ValidatorEmail implements Validator {
    private readonly input: string
    private readonly emailValidator: EmailValidator

    constructor (input: string, emailValidator: EmailValidator) {
        this.input = input
        this.emailValidator = emailValidator
    }

    validate (input: any): Error {
        const isValid = this.emailValidator.isValid(input[this.input])
        if (!isValid) {
            return new InvalidParamError(this.input)
        }
    }
}
