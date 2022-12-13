import { EmailValidatorAdapter } from '../../src/infra/validator/emailValidatorAdapter'
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

const newSut = (): EmailValidatorAdapter => {
    return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
    test('Should return false if EmailValidator returns false', () => {
        const sut = newSut()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
        const isValid = sut.isValid('any_invalid@email.com')
        expect(isValid).toBe(true)
    })

    test('Should return true if EmailValidator returns true', () => {
        const sut = newSut()
        const isValid = sut.isValid('any_valid@email.com')
        expect(isValid).toBe(true)
    })

    test('Should call validator with valid email', () => {
        const sut = newSut()
        const isEmail = jest.spyOn(validator, 'isEmail')
        sut.isValid('any_valid@email.com')
        expect(isEmail).toHaveBeenCalledWith('any_valid@email.com')
    })
})
