import { ValidatorEmail, EmailValidator } from '@/validations/validators/validatorProtocols'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/tests/mocks'
import { mockEmailValidator } from '@/tests/validations/validator/stubs/validatorStubs'

type SutTypes = {
    sut: ValidatorEmail
    emailValidatorStub: EmailValidator
}

const newSut = (): SutTypes => {
    const emailValidatorStub = mockEmailValidator()
    const sut = new ValidatorEmail('email', emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

describe('Validator Email', () => {
    test('Should call EmailValidator with correct email', () => {
        const { sut, emailValidatorStub } = newSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        sut.validate({ email: 'any_mail@email.com' })
        expect(isValidSpy).toHaveBeenCalledWith('any_mail@email.com')
    })

    test('Should return an error if EmailValidator return false', () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const invalidEmail = sut.validate('any_mail@email.com')
        expect(invalidEmail).toEqual(new InvalidParamError('email'))
    })

    test('Should throw if EmailValidator throws', () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(throwError)
        expect(sut.validate).toThrow()
    })
})
