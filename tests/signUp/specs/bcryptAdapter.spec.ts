import { BCryptAdapter } from '../../../src/infra/cryptography/bcrypt/bcryptAdapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
    async genSalt (): Promise<string> {
        return new Promise(resolve => resolve('salt'))
    },

    async hash (): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    },

    async compare (): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }
}))

const newSut = (): BCryptAdapter => {
    return new BCryptAdapter()
}

describe('BCrypt Adapter', () => {
    test('Should call genHash with correct values', async () => {
        const sut = newSut()
        const hashSpyOn = jest.spyOn(bcrypt, 'hash')
        await sut.genHash('any_value')
        expect(hashSpyOn).toHaveBeenCalledWith('any_value','salt')
    })

    test('Should return valid hash if genHash succeeds', async () => {
        const sut = newSut()
        const hashValue = await sut.genHash('any_value')
        expect(hashValue).toBe('hash')
    })

    test('Should throw if genHash throws', async () => {
        const sut = newSut()
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.genHash('any_value')
        await expect(promise).rejects.toThrow()
    })

    test('Should call hashCompare with correct values', async () => {
        const sut = newSut()
        const compareSpyOn = jest.spyOn(bcrypt, 'compare')
        await sut.hashCompare('any_value', 'any_hash')
        expect(compareSpyOn).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return true if compareHash succeeds', async () => {
        const sut = newSut()
        const isValid = await sut.hashCompare('any_value', 'any_hash')
        expect(isValid).toBeTruthy()
    })

    test('Should return false if compareHash fails', async () => {
        const sut = newSut()
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
        const promise = await sut.hashCompare('any_value', 'any_hash')
        expect(promise).toBeFalsy()
    })

    test('Should throw if compareHash throws', async () => {
        const sut = newSut()
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.hashCompare('any_value', 'any_hash')
        await expect(promise).rejects.toThrow()
    })
})
