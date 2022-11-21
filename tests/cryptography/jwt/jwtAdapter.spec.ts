import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/cryptography/jwt/jwtAdapter'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return new Promise(resolve => resolve('any_token'))
    }
}))

interface SutTypes {
    sut: JwtAdapter
}

const newSut = (): SutTypes => {
    const sut = new JwtAdapter('secret')
    return {
        sut
    }
}

describe('JWT Adapter', () => {
    test('Should call JWTAdapter with correct values', async () => {
        const { sut } = newSut()
        const signSpyOn = jest.spyOn(jwt, 'sign')
        await sut.encrypt('any_id')
        expect(signSpyOn).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a AccessToken on sign success', async () => {
        const { sut } = newSut()
        const accessToken = await sut.encrypt('any_id')
        expect(accessToken).toBe('any_token')
    })
})
