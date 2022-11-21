import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/cryptography/jwt/jwtAdapter'

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
    test('Should call getToken with correct values', async () => {
        const { sut } = newSut()
        const signSpyOn = jest.spyOn(jwt, 'sign')
        await sut.encrypt('any_id')
        expect(signSpyOn).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })
})
