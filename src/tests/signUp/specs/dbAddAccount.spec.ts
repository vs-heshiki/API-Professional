import { AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from '../../../data/usecases/addAccount'
import { DbAddAccount } from '../../../data/usecases/addAccount/dbAddAccount'

const newFakeAccountModel = (): AddAccountModel => ({
    name: 'name_valid',
    email: 'any_valid@email.com',
    password: 'password_valid'
})

const newFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'name_valid',
    email: 'any_valid@email.com',
    password: 'hashed_password'
})

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
            return new Promise(resolve => resolve(newFakeAccount()))
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
        await sut.add(newFakeAccountModel())
        expect(encrypterSpyOn).toBeCalledWith('password_valid')
    })

    test('Should throw Encrypter if throws', async () => {
        const { sut, encrypterStub } = newSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(newFakeAccountModel())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(newFakeAccountModel())
        expect(addSpyOn).toHaveBeenCalledWith({
            name: 'name_valid',
            email: 'any_valid@email.com',
            password: 'hashed_password'
        })
    })

    test('Should throw AddAccountRepository if throws', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(newFakeAccount())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on correct', async () => {
        const { sut } = newSut()
        const account = await sut.add(newFakeAccountModel())
        expect(account).toEqual(newFakeAccount())
    })
})
