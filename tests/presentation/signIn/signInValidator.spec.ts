import {
    ValidatorComposite,
    Validator,
    ValidatorEmail,
    ValidatorInputRequired
} from '@/validations/validators/validatorProtocols'
import { newSignInValidator } from '@/main/factories/controllers/login/signIn/signInValidatorFactory'
import { mockEmailValidator } from '@/tests/presentation/signIn/stubs/signInStubs'

jest.mock('@/validations/validators/validatorComposite')
describe('SignIn Validator', () => {
    test('Should call Validator Composite with all Validators', () => {
        newSignInValidator()
        const validations: Validator[] = []
        const inputs = ['email', 'password']
        inputs.forEach(input => {
            validations.push(new ValidatorInputRequired(input))
        })
        validations.push(new ValidatorEmail('email', mockEmailValidator()))
        expect(ValidatorComposite).toHaveBeenCalledWith(validations)
    })
})
