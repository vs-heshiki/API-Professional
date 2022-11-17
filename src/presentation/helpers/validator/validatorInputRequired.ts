import { MissingParamError } from '../../errors'
import { Validator } from '../../protocols/validator'

export class ValidatorInputRequired implements Validator {
    private readonly field: string
    constructor (field: string) {
        this.field = field
    }

    validate (input: any): Error {
        if (!input(this.field)) {
            return new MissingParamError(this.field)
        }
    }
}
