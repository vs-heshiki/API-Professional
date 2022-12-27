import { JwtAdapter } from '@/infra/cryptography/jwt/jwtAdapter'
import { throwError } from '@/tests/mocks'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return Promise.resolve('any_token')
    },

    async verify (): Promise<string> {
        return Promise.resolve('any_value')
    }
}))

const newSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
    describe('Encrypt Method tests', () => {
        test('Should call Encrypt with correct values', async () => {
            const sut = newSut()
            const signSpyOn = jest.spyOn(jwt, 'sign')
            await sut.encrypt('any_id')
            expect(signSpyOn).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
        })

        test('Should return a AccessToken on sign success', async () => {
            const sut = newSut()
            const accessToken = await sut.encrypt('any_id')
            expect(accessToken).toBe('any_token')
        })

        test('Should throw if Encrypt throws', async () => {
            const sut = newSut()
            jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
            const promise = sut.encrypt('any_id')
            await expect(promise).rejects.toThrow()
        })
    })

    describe('Decrypter Method tests', () => {
        test('Should call Decrypter with correct values', async () => {
            const sut = newSut()
            const verifySpyOn = jest.spyOn(jwt, 'verify')
            await sut.decrypt('any_token')
            expect(verifySpyOn).toHaveBeenCalledWith('any_token', 'secret')
        })

        test('Should return a value on Decrypter success', async () => {
            const sut = newSut()
            const value = await sut.decrypt('any_token')
            expect(value).toBe('any_value')
        })

        test('Should throw if Decrypter throws', async () => {
            const sut = newSut()
            jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
            const promise = sut.decrypt('any_token')
            await expect(promise).rejects.toThrow()
        })
    })
})
