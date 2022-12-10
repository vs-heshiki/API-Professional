import { EmailValidatorAdapter } from '../../../adapters/validator/emailValidatorAdapter'
import { Validator, ValidatorComposite, ValidatorEmail, ValidatorInputRequired } from '../../../../presentation/helpers/validator'

export const newLoginValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
    const inputs = ['email', 'password']
    inputs.forEach(input => validations.push(new ValidatorInputRequired(input)))
    validations.push(new ValidatorEmail('email', new EmailValidatorAdapter()))
    return new ValidatorComposite(validations)
}
