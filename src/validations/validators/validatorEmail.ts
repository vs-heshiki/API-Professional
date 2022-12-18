import { InvalidParamError } from '../../presentation/errors/invalidParamError'
<<<<<<< HEAD:src/validator/validations/validatorEmail.ts
import { EmailValidator } from '../protocols/emailValidator'
import { Validator } from '../../presentation/protocols/validator'
=======
import { Validator } from '../../presentation/protocols/validator'
import { EmailValidator } from '../protocols/emailValidator'
>>>>>>> feat/add-survey:src/validations/validators/validatorEmail.ts

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
