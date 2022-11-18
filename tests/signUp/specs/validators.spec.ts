import { MissingParamError } from './../../../src/presentation/errors/missingParamError'
import { ValidatorInputRequired } from './../../../src/presentation/helpers/validator/validatorInputRequired'

describe('Validators', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = new ValidatorInputRequired('input')
        const inputRequired = sut.validate({ name: 'any_name' })
        expect(inputRequired).toEqual(new MissingParamError('input'))
    })
})
