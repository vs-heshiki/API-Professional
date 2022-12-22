import { EmailValidatorAdapter } from '@/infra/validator/emailValidatorAdapter'
import {
    Validator,
    ValidatorComposite,
    ValidatorEmail,
    ValidatorCompareInputs,
    ValidatorInputRequired
} from '@/validations/validators/validatorProtocols'

export const newSignUpValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
        const inputs = ['name', 'email', 'password', 'confirmPassword']
        inputs.forEach(input => validations.push(new ValidatorInputRequired(input)))
        validations.push(new ValidatorCompareInputs('password', 'confirmPassword'))
        validations.push(new ValidatorEmail('email', new EmailValidatorAdapter()))
    return new ValidatorComposite(validations)
}
