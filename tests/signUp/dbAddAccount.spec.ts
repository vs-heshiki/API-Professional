import { DbAddAccount, AddAccountModel, Hasher, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from '../../src/data/usecases/addAccount/dbAddAccountProtocols'

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

const newHasher = (): Hasher => {
    class GenHashStub implements Hasher {
        async genHash (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new GenHashStub()
}

const newAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccountModel): Promise<AccountModel> {
            return new Promise(resolve => resolve(newFakeAccount()))
        }
    }
    return new AddAccountRepositoryStub()
}

const newLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadAccByEmail (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
    sut: DbAddAccount
    genHasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const newSut = (): SutTypes => {
    const genHasherStub = newHasher()
    const addAccountRepositoryStub = newAddAccountRepository()
    const loadAccountByEmailRepositoryStub = newLoadAccountByEmailRepository()
    const sut = new DbAddAccount(genHasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        genHasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}

describe('Database AddAccount Usecases', () => {
    test('Should call Hasher with correct value', async () => {
        const { sut, genHasherStub } = newSut()
        const hasherSpyOn = jest.spyOn(genHasherStub, 'genHash')
        await sut.add(newFakeAccountModel())
        expect(hasherSpyOn).toBeCalledWith('password_valid')
    })

    test('Should throw Hasher if throws', async () => {
        const { sut, genHasherStub } = newSut()
        jest.spyOn(genHasherStub, 'genHash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
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

    test('Should return null if LoadAccountByEmailRepository returns an account', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccByEmail').mockReturnValueOnce(new Promise(resolve => resolve(newFakeAccount())))
        const account = await sut.add(newFakeAccountModel())
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadAccByEmail')
        await sut.add(newFakeAccountModel())
        expect(loadSpyOn).toHaveBeenCalledWith('any_valid@email.com')
    })
})
