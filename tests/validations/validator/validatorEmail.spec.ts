import { ValidatorEmail } from '../../../src/validations/validators'
import { EmailValidator } from '../../../src/validations/protocols/emailValidator'
import { InvalidParamError } from '../../../src/presentation/errors'

const newEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

interface SutTypes {
    sut: ValidatorEmail
    emailValidatorStub: EmailValidator
}

const newSut = (): SutTypes => {
    const emailValidatorStub = newEmailValidator()
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
        sut.validate({ email: 'any_email@email.com' })
        expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should return an error if EmailValidator return false', () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const invalidEmail = sut.validate('any_invalid@email.com')
        expect(invalidEmail).toEqual(new InvalidParamError('email'))
    })

    test('Should throw if EmailValidator throws', () => {
        const { sut, emailValidatorStub } = newSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        expect(sut.validate).toThrow()
    })
})
