import { BCryptAdapter } from './bcryptAdapter'
import bcrypt from 'bcrypt'

describe('BCrypt Adapter', () => {
    test('Should call bcrypt with correct values', async () => {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const sut = new BCryptAdapter(salt)
        const bcryptSpyOn = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(bcryptSpyOn).toHaveBeenCalledWith('any_value', salt)
    })
})
