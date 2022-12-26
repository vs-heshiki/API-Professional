import { DbAuthenticator } from '@/data/usecases/account/authenticator/dbAuthenticator'
import { AuthenticateParams, LoadAccountByEmailRepository, UpdateAccessTokenRepository, Encrypter, HashCompare } from '@/data/usecases/account/authenticator/dbAuthtenticatorProtocols'
import { mockEncrypter, mockHashCompare, mockUpdateAccessTokenRepository, mockLoadAccountByEmailRepository } from '@/tests/data/usecases/stubs/dbAccountStubs'
import { throwError } from '@/tests/mocks'

const newFakeAuthenticate = (): AuthenticateParams => ({
    email: 'any_mail@email.com',
    password: 'any_password'
})

type SutTypes = {
    sut: DbAuthenticator
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
    hashCompareStub: HashCompare
    tokenGeneratorStub: Encrypter
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const newSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
    const hashCompareStub = mockHashCompare()
    const tokenGeneratorStub = mockEncrypter()
    const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
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
        expect(loadSpyOn).toHaveBeenCalledWith('any_mail@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = newSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
            .mockImplementationOnce(throwError)
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
            .mockImplementationOnce(throwError)
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
            .mockImplementationOnce(throwError)
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
            .mockImplementationOnce(throwError)
        const promise = sut.auth(newFakeAuthenticate())
        await expect(promise).rejects.toThrow()
    })
})
