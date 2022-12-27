import { BCryptAdapter } from '@/infra/cryptography/bcrypt/bcryptAdapter'
import { throwError } from '@/tests/mocks'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
    async genSalt (): Promise<string> {
        return Promise.resolve('salt')
    },

    async hash (): Promise<string> {
        return Promise.resolve('hash')
    },

    async compare (): Promise<boolean> {
        return Promise.resolve(true)
    }
}))

const newSut = (): BCryptAdapter => {
    return new BCryptAdapter()
}

describe('BCrypt Adapter', () => {
    describe('GenHash Method tests', () => {
        test('Should call genHash with correct values', async () => {
            const sut = newSut()
            const hashSpyOn = jest.spyOn(bcrypt, 'hash')
            await sut.genHash('any_value')
            expect(hashSpyOn).toHaveBeenCalledWith('any_value', 'salt')
        })

        test('Should return valid hash if genHash succeeds', async () => {
            const sut = newSut()
            const hashValue = await sut.genHash('any_value')
            expect(hashValue).toBe('hash')
        })

        test('Should throw if genHash throws', async () => {
            const sut = newSut()
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
            const promise = sut.genHash('any_value')
            await expect(promise).rejects.toThrow()
        })
    })

    describe('HashCompare Method tests', () => {
        test('Should call compareHash with correct values', async () => {
            const sut = newSut()
            const compareHashSpyOn = jest.spyOn(bcrypt, 'compare')
            await sut.compareHash('any_value', 'any_hash')
            expect(compareHashSpyOn).toHaveBeenCalledWith('any_value', 'any_hash')
        })

        test('Should return true if compareHashHash succeeds', async () => {
            const sut = newSut()
            const isValid = await sut.compareHash('any_value', 'any_hash')
            expect(isValid).toBeTruthy()
        })

        test('Should return false if compareHashHash fails', async () => {
            const sut = newSut()
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
            const promise = await sut.compareHash('any_value', 'any_hash')
            expect(promise).toBeFalsy()
        })

        test('Should throw if compareHash throws', async () => {
            const sut = newSut()
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
            const promise = sut.compareHash('any_value', 'any_hash')
            await expect(promise).rejects.toThrow()
        })
    })
})
