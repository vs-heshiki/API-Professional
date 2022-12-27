import { DbAddAccount } from '@/data/usecases/account/addAccount/dbAddAccount'
import {
    Hasher,
    AccountModel,
    AddAccountRepository,
    LoadAccountByEmailRepository
} from '@/data/usecases/account/addAccount/dbAddAccountProtocols'
import { mockAddAccountRepository, mockHasher } from '@/tests/data/usecases/stubs/dbAccountStubs'
import { mockAccount, mockAddAccountData, throwError } from '@/tests/mocks'

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

type SutTypes = {
    sut: DbAddAccount
    genHasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const newSut = (): SutTypes => {
    const genHasherStub = mockHasher()
    const addAccountRepositoryStub = mockAddAccountRepository()
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
    const sut = new DbAddAccount(genHasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        genHasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}

describe('Database AddAccount UseCase', () => {
    test('Should call Hasher with correct value', async () => {
        const { sut, genHasherStub } = newSut()
        const hasherSpyOn = jest.spyOn(genHasherStub, 'genHash')
        await sut.add(mockAddAccountData())
        expect(hasherSpyOn).toBeCalledWith('any_password')
    })

    test('Should throw Hasher if throws', async () => {
        const { sut, genHasherStub } = newSut()
        jest.spyOn(genHasherStub, 'genHash').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountData())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(mockAddAccountData())
        expect(addSpyOn).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_mail@email.com',
            password: 'hashed_password'
        })
    })

    test('Should throw AddAccountRepository if throws', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAccount())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on correct', async () => {
        const { sut } = newSut()
        const account = await sut.add(mockAddAccountData())
        expect(account).toEqual(mockAccount())
    })

    test('Should return null if LoadAccountByEmailRepository returns an account', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
            .mockReturnValueOnce(Promise.resolve(mockAccount()))
        const account = await sut.add(mockAddAccountData())
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(mockAddAccountData())
        expect(loadSpyOn).toHaveBeenCalledWith('any_mail@email.com')
    })
})
