import { ValidatorInputRequired } from '../../../src/validations/validators'
import { MissingParamError } from '../../../src/presentation/errors/missingParamError'

const newSut = (): ValidatorInputRequired => {
        return new ValidatorInputRequired('input')
    }

describe('Validator Input Required', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = newSut()
        const error = sut.validate({ name: 'any_name' })
        expect(error).toEqual(new MissingParamError('input'))
    })

    test('Should not return if validation pass', () => {
        const sut = new ValidatorInputRequired('input')
        const error = sut.validate({ input: 'any_value' })
        expect(error).toBeFalsy()
    })
})
