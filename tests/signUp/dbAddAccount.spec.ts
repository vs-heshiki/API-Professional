import { DbAddAccount, AddAccountModel, Hasher, AccountModel, AddAccountRepository } from '../../src/data/usecases/addAccount/dbAddAccountProtocols'

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

interface SutTypes {
    sut: DbAddAccount
    genHasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
}

const newSut = (): SutTypes => {
    const genHasherStub = newHasher()
    const addAccountRepositoryStub = newAddAccountRepository()
    const sut = new DbAddAccount(genHasherStub, addAccountRepositoryStub)
    return {
        sut,
        genHasherStub,
        addAccountRepositoryStub
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
})
