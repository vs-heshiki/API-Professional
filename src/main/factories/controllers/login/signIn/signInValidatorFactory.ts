<<<<<<< HEAD:src/main/factories/controllers/login/loginValidatorFactory.ts
import { EmailValidatorAdapter } from '../../../../infra/validator/emailValidatorAdapter'
import { Validator, ValidatorComposite, ValidatorEmail, ValidatorInputRequired } from '../../../../validator/validations'
=======
import { EmailValidatorAdapter } from '../../../../../infra/validator/emailValidatorAdapter'
import { Validator, ValidatorComposite, ValidatorEmail, ValidatorInputRequired } from '../../../../../validations/validators'
>>>>>>> feat/add-survey:src/main/factories/controllers/login/signIn/signInValidatorFactory.ts

export const newSignInValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
    const inputs = ['email', 'password']
    inputs.forEach(input => validations.push(new ValidatorInputRequired(input)))
    validations.push(new ValidatorEmail('email', new EmailValidatorAdapter()))
    return new ValidatorComposite(validations)
}
