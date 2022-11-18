import { ValidatorCompareInputs, ValidatorInputRequired, ValidatorComposite } from './../../presentation/helpers/validator'
import { Validator } from '../../presentation/protocols/validator'

export const newSignUpValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
        const fields = ['name', 'email', 'password', 'confirmPassword']
        for (const field of fields) {
            validations.push(new ValidatorInputRequired(field))
        }
        validations.push(new ValidatorCompareInputs('password', 'confirmPassword'))
    return new ValidatorComposite(validations)
}
