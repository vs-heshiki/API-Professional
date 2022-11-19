import { LoadAccountByEmailRepository, DbAuthenticator, AuthenticateModel } from '../../src/data/usecases/authenticator'
import { AccountModel } from '../../src/data/usecases/addAccount'

const newFakeAccount = (): AccountModel => ({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
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

interface SutTypes {
    sut: DbAuthenticator
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const newSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = newLoadAccountByEmailRepository()
    const sut = new DbAuthenticator(loadAccountByEmailRepositoryStub)
    return {
        sut,
        loadAccountByEmailRepositoryStub
    }
}

describe('DB Authenticator UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
        await sut.auth(newFakeAuthenticate())
        expect(loadSpyOn).toHaveBeenCalledWith('any_email@email.com')
    })
})
