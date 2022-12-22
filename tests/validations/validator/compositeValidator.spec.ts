import { ValidatorComposite, Validator } from '@/validations/validators/validatorProtocols'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'

const newValidator = (): Validator => {
    class ValidationStub implements Validator {
        validate (input: any): Error {
            return null
        }
    }
    return new ValidationStub()
}

type SutTypes = {
    sut: ValidatorComposite
    validatorsStub: Validator[]
}

const newSut = (): SutTypes => {
    const validatorsStub = [
        newValidator(),
        newValidator()
    ]
    const sut = new ValidatorComposite(validatorsStub)
    return {
        sut,
        validatorsStub
    }
}

describe('Validator Composite', () => {
    test('Should return an error if any validator fails', () => {
        const { sut, validatorsStub } = newSut()
        jest.spyOn(validatorsStub[0], 'validate')
            .mockReturnValueOnce(new MissingParamError('any_input'))
        const error = sut.validate({ any_input: 'any_value' })
        expect(error).toEqual(new MissingParamError('any_input'))
    })

    test('Should return first error if more than one validator fails', () => {
        const { sut, validatorsStub } = newSut()
        jest.spyOn(validatorsStub[0], 'validate')
            .mockReturnValueOnce(new InvalidParamError('any_input'))
        jest.spyOn(validatorsStub[1], 'validate')
            .mockReturnValueOnce(new MissingParamError('any_input'))
        const error = sut.validate({ any_input: 'any_value' })
        expect(error).toEqual(new InvalidParamError('any_input'))
    })

    test('Should not return if validator pass', () => {
        const { sut } = newSut()
        const error = sut.validate({ any_input: 'any_value' })
        expect(error).toBeFalsy()
    })
})
