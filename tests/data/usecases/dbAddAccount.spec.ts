import { DbAddAccount } from '@/data/usecases/account/addAccount/dbAddAccount'
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from '@/tests/data/usecases/spy/dbAccountSpy'
import { mockAddAccountData, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbAddAccount
    hasherSpy: HasherSpy
    addAccountRepositorySpy: AddAccountRepositorySpy
    checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const newSut = (): SutTypes => {
    const hasherSpy = new HasherSpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)
    return {
        sut,
        hasherSpy,
        addAccountRepositorySpy,
        checkAccountByEmailRepositorySpy
    }
}

describe('Database AddAccount UseCase', () => {
    const addAccount = mockAddAccountData()
    test('Should call Hasher with correct value', async () => {
        const { sut, hasherSpy } = newSut()
        await sut.add(addAccount)
        expect(hasherSpy.value).toBe(addAccount.password)
    })

    test('Should throw Hasher if throws', async () => {
        const { sut, hasherSpy } = newSut()
        jest.spyOn(hasherSpy, 'genHash').mockImplementationOnce(throwError)
        const promise = sut.add(addAccount)
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct params', async () => {
        const { sut, addAccountRepositorySpy, hasherSpy } = newSut()
        await sut.add(addAccount)
        expect(addAccountRepositorySpy.addAccountParams).toEqual({
            name: addAccount.name,
            email: addAccount.email,
            password: hasherSpy.hashed
        })
    })

    test('Should throw AddAccountRepository if throws', async () => {
        const { sut, addAccountRepositorySpy } = newSut()
        jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(addAccount)
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on correct', async () => {
        const { sut } = newSut()
        const isValid = await sut.add(addAccount)
        expect(isValid).toBeTruthy()
    })

    test('Should return false if CheckAccountByEmailRepository returns an true', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = newSut()
        checkAccountByEmailRepositorySpy.result = true
        const isValid = await sut.add(addAccount)
        expect(isValid).toBeNull()
    })

    test('Should call CheckAccountByEmailRepository with correct email', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = newSut()
        await sut.add(addAccount)
        expect(checkAccountByEmailRepositorySpy.email).toEqual(addAccount.email)
    })
})
