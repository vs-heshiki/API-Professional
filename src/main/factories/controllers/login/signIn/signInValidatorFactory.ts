import { Validator, ValidatorComposite, ValidatorInputRequired,ValidatorEmail } from '../../../../../validations/validators'
import { EmailValidatorAdapter } from '../../../../../infra/validator/emailValidatorAdapter'

export const newSignInValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
    const inputs = ['email', 'password']
    inputs.forEach(input => validations.push(new ValidatorInputRequired(input)))
    validations.push(new ValidatorEmail('email', new EmailValidatorAdapter()))
    return new ValidatorComposite(validations)
}
