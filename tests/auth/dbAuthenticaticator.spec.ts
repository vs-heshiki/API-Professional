import { HashCompare } from '../../src/data/protocols/cryptography/hashCompare'
import { AccountModel } from '../../src/data/usecases/addAccount'
import { AuthenticateModel, DbAuthenticator, LoadAccountByEmailRepository } from '../../src/data/usecases/authenticator'

const newFakeAccount = (): AccountModel => ({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hashed_password'
})

const newFakeAuthenticate = (): AuthenticateModel => ({
    email: 'any_email@email.com',
    password: 'any_password'
})

const newLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async load (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(newFakeAccount()))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const newHashCompare = (): HashCompare => {
    class HashCompareStub implements HashCompare {
        async compare (password: string, hash: string): Promise<boolean> {
            return new Promise(resolve => resolve(true))
        }
    }
    return new HashCompareStub()
}

interface SutTypes {
    sut: DbAuthenticator
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
    hashCompareStub: HashCompare
}

const newSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = newLoadAccountByEmailRepository()
    const hashCompareStub = newHashCompare()
    const sut = new DbAuthenticator(loadAccountByEmailRepositoryStub, hashCompareStub)
    return {
        sut,
        loadAccountByEmailRepositoryStub,
        hashCompareStub
    }
}

describe('DB Authenticator UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
        await sut.auth(newFakeAuthenticate())
        expect(loadSpyOn).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
        const accessToken = await sut.auth(newFakeAuthenticate())
        expect(accessToken).toBeNull()
    })

    test('Should call HashCompare with correct values', async () => {
        const { sut, hashCompareStub } = newSut()
        const compareSpyOn = jest.spyOn(hashCompareStub, 'compare')
        await sut.auth(newFakeAuthenticate())
        expect(compareSpyOn).toHaveBeenCalledWith('any_password', 'hashed_password')
    })
})
