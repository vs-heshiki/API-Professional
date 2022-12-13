import { MissingParamError } from '../../presentation/errors'
import { Validator } from '../../presentation/protocols/validator'

export class ValidatorInputRequired implements Validator {
    constructor (
        private readonly field: string
        ) {}

    validate (input: any): Error {
        if (!input[this.field]) {
            return new MissingParamError(this.field)
        }
    }
}
