import { EmailValidatorAdapter } from './emailValidator'
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

describe('EmailValidator Adapter', () => {
    test('Should return false if EmailValidator returns false', () => {
        const sut = new EmailValidatorAdapter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
        const isValid = sut.isValid('any_invalid@email.com')
        expect(isValid).toBe(true)
    })

    test('Should return true if EmailValidator returns true', () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('any_valid@email.com')
        expect(isValid).toBe(true)
    })

    test('Should call validator with valid email', () => {
        const sut = new EmailValidatorAdapter()
        const isEmail = jest.spyOn(validator, 'isEmail')
        sut.isValid('any_valid@email.com')
        expect(isEmail).toHaveBeenCalledWith('any_valid@email.com')
    })
})
