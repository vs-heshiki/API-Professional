import { EmailValidatorAdapter } from './../../utils/emailValidator'
import { ValidatorEmail } from './../../presentation/helpers/validator/validatorEmail'
import { ValidatorCompareInputs, ValidatorInputRequired, ValidatorComposite } from './../../presentation/helpers/validator'
import { Validator } from '../../presentation/protocols/validator'

export const newSignUpValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
        const fields = ['name', 'email', 'password', 'confirmPassword']
        for (const field of fields) {
            validations.push(new ValidatorInputRequired(field))
        }
        validations.push(new ValidatorCompareInputs('password', 'confirmPassword'))
        validations.push(new ValidatorEmail('email', new EmailValidatorAdapter()))
    return new ValidatorComposite(validations)
}
