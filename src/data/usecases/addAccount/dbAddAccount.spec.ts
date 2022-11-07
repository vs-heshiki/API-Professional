import { Encrypter } from './../protocols/encrypter'
import { DbAddAccount } from './dbAddAccount'

interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
}

const newEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const newSut = (): SutTypes => {
    const encrypterStub = newEncrypter()
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
