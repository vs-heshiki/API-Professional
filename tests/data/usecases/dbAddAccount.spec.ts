import { DbAddAccount } from '@/data/usecases/account/addAccount/dbAddAccount'
import {
    Hasher,
    AddAccountRepository,
    CheckAccountByEmailRepository
} from '@/data/usecases/account/addAccount/dbAddAccountProtocols'
import { mockAddAccountRepository, mockCheckAccountByEmailRepository, mockHasher } from '@/tests/data/usecases/stubs/dbAccountStubs'
import { mockAccount, mockAddAccountData, throwError } from '@/tests/mocks'

const addAccount = mockAddAccountData()
const account = mockAccount()

type SutTypes = {
    sut: DbAddAccount
    genHasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    checkAccountByEmailRepositoryStub: CheckAccountByEmailRepository
}

const newSut = (): SutTypes => {
    const genHasherStub = mockHasher()
    const addAccountRepositoryStub = mockAddAccountRepository()
    const checkAccountByEmailRepositoryStub = mockCheckAccountByEmailRepository()
    const sut = new DbAddAccount(genHasherStub, addAccountRepositoryStub, checkAccountByEmailRepositoryStub)
    return {
        sut,
        genHasherStub,
        addAccountRepositoryStub,
        checkAccountByEmailRepositoryStub
    }
}

describe('Database AddAccount UseCase', () => {
    test('Should call Hasher with correct value', async () => {
        const { sut, genHasherStub } = newSut()
        const hasherSpyOn = jest.spyOn(genHasherStub, 'genHash')
        await sut.add(addAccount)
        expect(hasherSpyOn).toBeCalledWith(addAccount.password)
    })

    test('Should throw Hasher if throws', async () => {
        const { sut, genHasherStub } = newSut()
        jest.spyOn(genHasherStub, 'genHash').mockImplementationOnce(throwError)
        const promise = sut.add(addAccount)
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(addAccount)
        expect(addSpyOn).toHaveBeenCalledWith({
            name: addAccount.name,
            email: addAccount.email,
            password: 'hashed_password'
        })
    })

    test('Should throw AddAccountRepository if throws', async () => {
        const { sut, addAccountRepositoryStub } = newSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(addAccount)
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on correct', async () => {
        const { sut } = newSut()
        const isValid = await sut.add(addAccount)
        expect(isValid).toBeTruthy()
    })

    test('Should return null if CheckAccountByEmailRepository returns an true', async () => {
        const { sut, checkAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
            .mockReturnValueOnce(Promise.resolve(true))
        const addAccount = await sut.add(account)
        expect(addAccount).toBeNull()
    })

    test('Should call CheckAccountByEmailRepository with correct email', async () => {
        const { sut, checkAccountByEmailRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
        await sut.add(account)
        expect(loadSpyOn).toHaveBeenCalledWith(account.email)
    })
})
