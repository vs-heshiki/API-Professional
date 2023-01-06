import { DbAuthenticator } from '@/data/usecases/account/authenticator/dbAuthenticator'
import { UpdateAccessTokenRepositorySpy, LoadAccountByEmailRepositorySpy, HashCompareSpy, EncrypterSpy } from '@/tests/data/usecases/stubs/dbAccountStubs'
import { mockAuthenticate, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbAuthenticator
    loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
    hashCompareSpy: HashCompareSpy
    encrypterSpy: EncrypterSpy
    updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const newSut = (): SutTypes => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const hashCompareSpy = new HashCompareSpy()
    const encrypterSpy = new EncrypterSpy()
    const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
    const sut = new DbAuthenticator(
        loadAccountByEmailRepositorySpy,
        hashCompareSpy,
        encrypterSpy,
        updateAccessTokenRepositorySpy
    )
    return {
        sut,
        loadAccountByEmailRepositorySpy,
        hashCompareSpy,
        encrypterSpy,
        updateAccessTokenRepositorySpy
    }
}

describe('Database Authenticator UseCase', () => {
    const mockAuthParams = mockAuthenticate()
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = newSut()
        await sut.auth(mockAuthParams)
        expect(loadAccountByEmailRepositorySpy.email).toEqual(mockAuthParams.email)
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = newSut()
        jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
            .mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthParams)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = newSut()
        loadAccountByEmailRepositorySpy.accountModel = null
        const account = await sut.auth(mockAuthParams)
        expect(account).toBeNull()
    })

    test('Should call HashCompare with correct values', async () => {
        const { sut, hashCompareSpy, loadAccountByEmailRepositorySpy } = newSut()
        await sut.auth(mockAuthParams)
        expect(hashCompareSpy.value).toBe(mockAuthParams.password)
        expect(hashCompareSpy.hash).toBe(loadAccountByEmailRepositorySpy.accountModel.password)
    })

    test('Should throw if HashCompare throws', async () => {
        const { sut, hashCompareSpy } = newSut()
        jest.spyOn(hashCompareSpy, 'compareHash')
            .mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthParams)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if HashCompare returns false', async () => {
        const { sut, hashCompareSpy } = newSut()
        hashCompareSpy.result = false
        const accessToken = await sut.auth(mockAuthParams)
        expect(accessToken).toBeNull()
    })

    test('Should call Encrypter with correct id', async () => {
        const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = newSut()
        await sut.auth(mockAuthParams)
        expect(encrypterSpy.value).toBe(loadAccountByEmailRepositorySpy.accountModel.id)
    })

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterSpy } = newSut()
        jest.spyOn(encrypterSpy, 'encrypt')
            .mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthParams)
        await expect(promise).rejects.toThrow()
    })

    test('Should return an AuthenticatorModel on success', async () => {
        const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = newSut()
        const authenticatorModel = await sut.auth(mockAuthParams)
        expect(authenticatorModel.accessToken).toBe(encrypterSpy.accessToken)
        expect(authenticatorModel.name).toBe(loadAccountByEmailRepositorySpy.accountModel.name)
    })

    test('Should call UpdateAccessTokenRepository with correct values', async () => {
        const { sut, updateAccessTokenRepositorySpy, encrypterSpy, loadAccountByEmailRepositorySpy } = newSut()
        await sut.auth(mockAuthParams)
        expect(updateAccessTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.accountModel.id)
        expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.accessToken)
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositorySpy } = newSut()
        jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken')
            .mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthParams)
        await expect(promise).rejects.toThrow()
    })
})
