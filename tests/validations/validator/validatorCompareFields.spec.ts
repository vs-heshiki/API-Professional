import { ValidatorCompareInputs } from '../../../src/validations/validators'
import { InvalidParamError } from '../../../src/presentation/errors/invalidParamError'

describe('Validator Compare Fields', () => {
    const newSut = (): ValidatorCompareInputs => {
        return new ValidatorCompareInputs('input','otherInput')
    }

    test('Should return a InvalidParamError if validation fails', () => {
        const sut = newSut()
        const error = sut.validate({ input: 'value', otherInput: 'otherValue' })
        expect(error).toEqual(new InvalidParamError('otherInput'))
    })

    test('Should not return if validation pass', () => {
        const sut = newSut()
        const error = sut.validate({ input: 'value', otherInput: 'value' })
        expect(error).toBeFalsy()
    })
})
