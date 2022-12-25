import { DbAuthenticator } from '@/data/usecases/account/authenticator/dbAuthenticator'
import {
    AuthenticateModel,
    AccountModel,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    Encrypter,
    HashCompare
} from '@/data/usecases/account/authenticator/dbAuthtenticatorProtocols'

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
        async loadByEmail (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(newFakeAccount()))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const newHashCompare = (): HashCompare => {
    class HashCompareStub implements HashCompare {
        async compareHash (value: string, hash: string): Promise<boolean> {
            return new Promise(resolve => resolve(true))
        }
    }
    return new HashCompareStub()
}

const newEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('access_token'))
        }
    }
    return new EncrypterStub()
}

const newUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async updateAccessToken (id: string, token: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}

type SutTypes = {
    sut: DbAuthenticator
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
    hashCompareStub: HashCompare
    tokenGeneratorStub: Encrypter
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const newSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = newLoadAccountByEmailRepository()
    const hashCompareStub = newHashCompare()
    const tokenGeneratorStub = newEncrypter()
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

describe('Database Authenticator UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.auth(newFakeAuthenticate())
        expect(loadSpyOn).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
        const accessToken = await sut.auth(newFakeAuthenticate())
        expect(accessToken).toBeNull()
    })

    test('Should call HashCompare with correct values', async () => {
        const { sut, hashCompareStub } = newSut()
        const compareSpyOn = jest.spyOn(hashCompareStub, 'compareHash')
        await sut.auth(newFakeAuthenticate())
        expect(compareSpyOn).toHaveBeenCalledWith('any_password', 'hashed_password')
    })

    test('Should throw if HashCompare throws', async () => {
        const { sut, hashCompareStub } = newSut()
        jest.spyOn(hashCompareStub, 'compareHash')
            .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if HashCompare returns false', async () => {
        const { sut, hashCompareStub } = newSut()
        jest.spyOn(hashCompareStub, 'compareHash')
            .mockReturnValueOnce(new Promise((resolve) => resolve(false)))
        const accessToken = await sut.auth(newFakeAuthenticate())
        expect(accessToken).toBeNull()
    })

    test('Should call Encrypter with correct id', async () => {
        const { sut, tokenGeneratorStub } = newSut()
        const encryptSpyOn = jest.spyOn(tokenGeneratorStub, 'encrypt')
        await sut.auth(newFakeAuthenticate())
        expect(encryptSpyOn).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if Encrypter throws', async () => {
        const { sut, tokenGeneratorStub } = newSut()
        jest.spyOn(tokenGeneratorStub, 'encrypt')
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
        const updateSpyOn = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
        await sut.auth(newFakeAuthenticate())
        expect(updateSpyOn).toHaveBeenCalledWith('any_id', 'access_token')
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositoryStub } = newSut()
        jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })
})
