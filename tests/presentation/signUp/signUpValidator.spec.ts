import {
    ValidatorComposite,
    Validator,
    ValidatorInputRequired,
    ValidatorCompareInputs,
    ValidatorEmail
} from '@/validations/validators/validatorProtocols'
import { newSignUpValidator } from '@/main/factories/controllers/login/signUp/signupValidatorFactory'
import { mockEmailValidator } from '@/tests/validations/validator/stubs/validatorStubs'

jest.mock('@/validations/validators/validatorComposite')

describe('SignUpValidator Factory', () => {
    test('Should call Validator Composite with all Validators', () => {
        newSignUpValidator()
        const validations: Validator[] = []
        const inputs = ['name', 'email', 'password', 'confirmPassword']
        for (const field of inputs) {
            validations.push(new ValidatorInputRequired(field))
        }
        validations.push(new ValidatorCompareInputs('password','confirmPassword'))
        validations.push(new ValidatorEmail('email', mockEmailValidator()))
        expect(ValidatorComposite).toHaveBeenCalledWith(validations)
    })
})
