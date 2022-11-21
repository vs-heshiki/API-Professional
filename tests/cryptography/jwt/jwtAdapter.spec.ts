import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/cryptography/jwt/jwtAdapter'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return new Promise(resolve => resolve('any_token'))
    }
}))

const newSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
    test('Should call JwtAdapter with correct values', async () => {
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

    test('Should throw if JwtAdapter throws', async () => {
        const sut = newSut()
        jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
            throw new Error()
        })
        const promise = sut.encrypt('any_id')
        await expect(promise).rejects.toThrow()
    })
})
