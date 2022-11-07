import { AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from './dbAddAccountProtocols'
import { DbAddAccount } from './dbAddAccount'

const newEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const newAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'name_valid',
                email: 'any_valid@email.com',
                password: 'hashed_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountRepositoryStub()
}

interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
    addAccountRepositoryStub: AddAccountRepository
}

const newSut = (): SutTypes => {
    const encrypterStub = newEncrypter()
    const addAccountRepositoryStub = newAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe('Database AddAccount Usecases', () => {
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

    test('Should throw Encrypter if throws', async () => {
        const { sut, encrypterStub } = newSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const newAccount = {
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'password_valid'
        }
        const promise = sut.add(newAccount)
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(addAccountRepositoryStub, 'add')
        const newAccount = {
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'password_valid'
        }
        await sut.add(newAccount)
        expect(addSpyOn).toHaveBeenCalledWith({
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'hashed_password'
        })
    })

    test('Should throw AddAccountRepository if throws', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const newAccount = {
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'password_valid'
        }
        const promise = sut.add(newAccount)
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on correct', async () => {
        const { sut } = newSut()
        const newAccount = {
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'password_valid'
        }
        const account = await sut.add(newAccount)
        expect(account).toEqual({
            id: 'valid_id',
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'hashed_password'
        })
    })
})
