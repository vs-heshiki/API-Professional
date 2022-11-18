import { ValidatorCompareInputs } from '../../../presentation/helpers/validator/validatorCompareInputs'
import { ValidatorComposite, ValidatorInputRequired } from '../../../presentation/helpers/validator'
import { Validator } from '../../../presentation/protocols/validator'
import { newSignUpValidator } from './../../../main/factories/signupValidator'

jest.mock('./../../../presentation/helpers/validator/validatorComposite')

describe('SignUpValidator Factory', () => {
    test('Should call Validator Composite with all Validators', () => {
        newSignUpValidator()
        const validations: Validator[] = []
        const inputs = ['name', 'email', 'password', 'confirmPassword']
        for (const field of inputs) {
            validations.push(new ValidatorInputRequired(field))
        }
        validations.push(new ValidatorCompareInputs('password','confirmPassword'))
        expect(ValidatorComposite).toHaveBeenCalledWith(validations)
    })
})
