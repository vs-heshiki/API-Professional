import { BCryptAdapter } from '../../infra/cryptography/bcryptAdapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    },

    async genSalt (): Promise<string> {
        return new Promise(resolve => resolve('salt'))
    }
}))

const newSut = (): BCryptAdapter => {
    return new BCryptAdapter()
}

describe('BCrypt Adapter', () => {
    test('Should call bcrypt with correct values', async () => {
        const sut = newSut()
        const hashSpyOn = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hashSpyOn).toHaveBeenCalledWith('any_value','salt')
    })

    test('Should return hash with success', async () => {
        const sut = newSut()
        const hashValue = await sut.encrypt('any_value')
        expect(hashValue).toBe('hash')
    })

    test('Should throw if bcrypt throws', async () => {
        const sut = newSut()
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.encrypt('any_value')
        await expect(promise).rejects.toThrow()
    })
})
