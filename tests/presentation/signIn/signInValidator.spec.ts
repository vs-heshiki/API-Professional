import {
    ValidatorComposite,
    Validator,
    ValidatorEmail,
    ValidatorInputRequired,
    EmailValidator
} from '@/validations/validators/validatorProtocols'
import { newSignInValidator } from '@/main/factories/controllers/login/signIn/signInValidatorFactory'

jest.mock('@/validations/validators/validatorComposite')

const newEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignIn Validator', () => {
    test('Should call Validator Composite with all Validators', () => {
        newSignInValidator()
        const validations: Validator[] = []
        const inputs = ['email', 'password']
        inputs.forEach(input => {
            validations.push(new ValidatorInputRequired(input))
        })
        validations.push(new ValidatorEmail('email', newEmailValidator()))
        expect(ValidatorComposite).toHaveBeenCalledWith(validations)
    })
})
