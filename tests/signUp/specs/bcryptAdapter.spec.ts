import { BCryptAdapter } from '../../../src/infra/cryptography/bcryptAdapter'
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

    test('Should return valid hash if genHash on success', async () => {
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

    test('Should call HashCompare with correct values', async () => {
        const sut = newSut()
        const compareSpyOn = jest.spyOn(bcrypt, 'compare')
        await sut.hashCompare('any_value', 'any_hash')
        expect(compareSpyOn).toHaveBeenCalledWith('any_value', 'any_hash')
    })
})
