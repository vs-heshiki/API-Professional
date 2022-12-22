import { InvalidParamError } from '@/presentation/errors/invalidParamError'
import { Validator } from './validatorProtocols'

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
