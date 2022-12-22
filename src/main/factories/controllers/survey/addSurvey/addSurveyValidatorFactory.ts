import { Validator, ValidatorComposite, ValidatorInputRequired } from '@/validations/validators/validatorProtocols'

export const newAddSurveyValidator = (): ValidatorComposite => {
    const validations: Validator[] = []
        const inputs = ['question', 'answers']
        inputs.forEach(input => validations.push(new ValidatorInputRequired(input)))
    return new ValidatorComposite(validations)
}
