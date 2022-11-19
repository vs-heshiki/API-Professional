import { HashCompare } from '../../src/data/protocols/cryptography/hashCompare'
import { TokenGenerator } from '../../src/data/protocols/cryptography/tokenGenerator'
import { UpdateAccessTokenRepository } from '../../src/data/protocols/cryptography/updateAccessTokenRepository'
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

const newTokenGenerator = (): TokenGenerator => {
    class TokenGeneratorStub implements TokenGenerator {
        async generate (id: string): Promise<string> {
        return new Promise(resolve => resolve('access_token'))
        }
    }
    return new TokenGeneratorStub()
}

const newUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async update (id: string, token: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
    sut: DbAuthenticator
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
    hashCompareStub: HashCompare
    tokenGeneratorStub: TokenGenerator
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const newSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = newLoadAccountByEmailRepository()
    const hashCompareStub = newHashCompare()
    const tokenGeneratorStub = newTokenGenerator()
    const updateAccessTokenRepositoryStub = newUpdateAccessTokenRepository()
    const sut = new DbAuthenticator(
        loadAccountByEmailRepositoryStub,
        hashCompareStub,
        tokenGeneratorStub,
        updateAccessTokenRepositoryStub
    )
    return {
        sut,
        loadAccountByEmailRepositoryStub,
        hashCompareStub,
        tokenGeneratorStub,
        updateAccessTokenRepositoryStub
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

    test('Should throw if HashCompare throws', async () => {
        const { sut, hashCompareStub } = newSut()
        jest.spyOn(hashCompareStub, 'compare')
            .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if HashCompare returns false', async () => {
        const { sut, hashCompareStub } = newSut()
        jest.spyOn(hashCompareStub, 'compare')
            .mockReturnValueOnce(new Promise((resolve) => resolve(false)))
        const accessToken = await sut.auth(newFakeAuthenticate())
        expect(accessToken).toBeNull()
    })

    test('Should call TokenGenerator with correct id', async () => {
        const { sut, tokenGeneratorStub } = newSut()
        const generateSpyOn = jest.spyOn(tokenGeneratorStub, 'generate')
        await sut.auth(newFakeAuthenticate())
        expect(generateSpyOn).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if TokenGenerator throws', async () => {
        const { sut, tokenGeneratorStub } = newSut()
        jest.spyOn(tokenGeneratorStub, 'generate')
            .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an AccessToken on success', async () => {
        const { sut } = newSut()
        const accessToken = await sut.auth(newFakeAuthenticate())
        expect(accessToken).toBe('access_token')
    })

    test('Should call UpdateAccessTokenRepository with correct values', async () => {
        const { sut, updateAccessTokenRepositoryStub } = newSut()
        const updateSpyOn = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
        await sut.auth(newFakeAuthenticate())
        expect(updateSpyOn).toHaveBeenCalledWith('any_id', 'access_token')
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositoryStub } = newSut()
        jest.spyOn(updateAccessTokenRepositoryStub, 'update')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })
})
