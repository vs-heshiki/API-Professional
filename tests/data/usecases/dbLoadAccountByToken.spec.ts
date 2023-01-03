import { DbLoadAccountByToken } from '@/data/usecases/account/loadAccountByToken/dbLoadAccountByToken'
import { LoadAccountByTokenRepository, Decrypter } from '@/data/usecases/account/loadAccountByToken/dbLoadAccountByTokenProtocols'
import { mockDecrypter, mockLoadAccountByTokenRepository } from '@/tests/data/usecases/stubs/dbAccountStubs'
import { throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const newSut = (): SutTypes => {
    const decrypterStub = mockDecrypter()
    const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
    const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
    return {
        sut,
        decrypterStub,
        loadAccountByTokenRepositoryStub
    }
}

describe('Database LoadAccountByToken Usecase', () => {
    test('Should call Decrypter with correct values', async () => {
        const { sut, decrypterStub } = newSut()
        const load = jest.spyOn(decrypterStub, 'decrypt')
        await sut.load('any_token', 'any_role')
        expect(load).toHaveBeenCalledWith('any_token')
    })

    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterStub } = newSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(null)
        const httpResponse = await sut.load('any_token', 'any_role')
        expect(httpResponse).toBeNull()
    })

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = newSut()
        const loadByTokenSpyOn = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
        await sut.load('any_token', 'any_role')
        expect(loadByTokenSpyOn).toHaveBeenCalledWith('any_token', 'any_role')
    })

    test('Should return null if LoadAccountByTokenRepository returns null', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = newSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(null)
        const httpResponse = await sut.load('any_token', 'any_role')
        expect(httpResponse).toBeNull()
    })

    test('Should return an accountId on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load('any_token', 'any_role')
        expect(httpResponse).toEqual({ accountId: 'any_id' })
    })

    test('Should return null if Decrypter throws', async () => {
        const { sut, decrypterStub } = newSut()
        jest.spyOn(decrypterStub, 'decrypt')
            .mockImplementationOnce(throwError)
        const httpResponse = await sut.load('any_token', 'any_role')
        expect(httpResponse).toBeNull()
    })

    test('Should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = newSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
            .mockImplementationOnce(throwError)
        const httpResponse = sut.load('any_token', 'any_role')
        await expect(httpResponse).rejects.toThrow()
    })
})
