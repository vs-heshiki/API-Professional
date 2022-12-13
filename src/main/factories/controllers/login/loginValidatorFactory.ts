import { EmailValidatorAdapter } from '../../../../infra/validator/emailValidatorAdapter'
import { Validator, ValidatorComposite, ValidatorEmail, ValidatorInputRequired } from '../../../../validator/validations'

export const newLoginValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
    const inputs = ['email', 'password']
    inputs.forEach(input => validations.push(new ValidatorInputRequired(input)))
    validations.push(new ValidatorEmail('email', new EmailValidatorAdapter()))
    return new ValidatorComposite(validations)
}
