<<<<<<< HEAD:tests/validator/loginValidator.spec.ts
import { EmailValidator } from './protocols/emailValidator'
import { ValidatorComposite, Validator, ValidatorEmail, ValidatorInputRequired } from '../../src/validator/validations'
import { newLoginValidator } from '../../src/main/factories/controllers/login/loginValidatorFactory'

jest.mock('../../src/validator/validations/validatorComposite')
=======
import { EmailValidator } from '../../../src/validations/protocols/emailValidator'
import { ValidatorComposite, Validator, ValidatorEmail, ValidatorInputRequired } from '../../../src/validations/validators'
import { newSignInValidator } from '../../../src/main/factories/controllers/login/signIn/signInValidatorFactory'

jest.mock('../../../src/validations/validators/validatorComposite')
>>>>>>> feat/add-survey:tests/validations/validator/signInValidator.spec.ts

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
