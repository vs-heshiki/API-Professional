import { EmailValidator } from './../../src/presentation/protocols/emailValidator'
import { ValidatorComposite, Validator, ValidatorEmail, ValidatorInputRequired } from './../../src/presentation/helpers/validator'
import { newLoginValidator } from './../../src/main/factories/login/loginValidator'

jest.mock('../../src/presentation/helpers/validator/validatorComposite')

const newEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('Login Validator', () => {
    test('Should call Validator Composite with all Validators', () => {
        newLoginValidator()
        const validations: Validator[] = []
        const inputs = ['email', 'password']
        inputs.forEach(input => {
            validations.push(new ValidatorInputRequired(input))
        })
        validations.push(new ValidatorEmail('email', newEmailValidator()))
        expect(ValidatorComposite).toHaveBeenCalledWith(validations)
    })
})
