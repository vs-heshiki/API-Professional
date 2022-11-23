import { MissingParamError } from '../../errors'
import { Validator } from '../../protocols/validator'

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
