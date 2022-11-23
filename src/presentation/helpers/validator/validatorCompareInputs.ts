import { InvalidParamError } from '../../errors/invalidParamError'
import { Validator } from '../../protocols/validator'

export class ValidatorCompareInputs implements Validator {
    constructor (
        private readonly input: string,
        private readonly inputToCompare: string
        ) {}

    validate (field: any): Error {
        if (field[this.input] !== field[this.inputToCompare]) {
            return new InvalidParamError(this.inputToCompare)
        }
    }
}
