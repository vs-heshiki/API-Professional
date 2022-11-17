import { ValidatorInputRequired } from '../../presentation/helpers/validator'
import { Validator } from '../../presentation/protocols/validator'
import { ValidatorComposite } from './../../presentation/helpers/validator/validatorComposite'

export const newSignUpValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
        const fields = ['name', 'email', 'password', 'confirmPassword']
        for (const field of fields) {
            validations.push(new ValidatorInputRequired(field))
        }
    return new ValidatorComposite(validations)
}
