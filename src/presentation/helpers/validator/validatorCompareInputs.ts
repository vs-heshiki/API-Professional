import { InvalidParamError } from '../../errors/invalidParamError'
import { Validator } from '../../protocols/validator'

export class ValidatorCompareInputs implements Validator {
    private readonly input: string
    private readonly inputToCompare: string

    constructor (input: string, inputToCompare: string) {
        this.input = input
        this.inputToCompare = inputToCompare
    }

    validate (field: any): Error {
        if (field[this.input] !== field[this.inputToCompare]) {
            return new InvalidParamError(this.inputToCompare)
        }
    }
}
