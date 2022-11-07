import { Encrypter } from './../protocols/encrypter'
import { DbAddAccount } from './dbAddAccount'

interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
}

const newSut = (): SutTypes => {
    class EncrypterStub {
        async encrypt (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}

describe('Database Add Account Usecases', () => {
    test('Should call Encrypter with correct value', async () => {
        const { sut, encrypterStub } = newSut()
        const encrypterSpyOn = jest.spyOn(encrypterStub, 'encrypt')
        const newAccount = {
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'password_valid'
        }
        await sut.add(newAccount)
        expect(encrypterSpyOn).toBeCalledWith('password_valid')
    })
})
