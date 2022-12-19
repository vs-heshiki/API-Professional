import { newSignUpValidator } from '../../../src/main/factories/controllers/login/signUp/signUpValidatorFactory'
import { EmailValidator } from '../../../src/validations/protocols/emailValidator'
import { ValidatorComposite , Validator, ValidatorInputRequired, ValidatorCompareInputs, ValidatorEmail } from '../../../src/validations/validators'

jest.mock('../../../src/validations/validators/validatorComposite')

const newEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignUpValidator Factory', () => {
    test('Should call Validator Composite with all Validators', () => {
        newSignUpValidator()
        const validations: Validator[] = []
        const inputs = ['name', 'email', 'password', 'confirmPassword']
        for (const field of inputs) {
            validations.push(new ValidatorInputRequired(field))
        }
        validations.push(new ValidatorCompareInputs('password','confirmPassword'))
        validations.push(new ValidatorEmail('email', newEmailValidator()))
        expect(ValidatorComposite).toHaveBeenCalledWith(validations)
    })
})
