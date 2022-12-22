import { Decrypter } from '@/data/protocols/cryptography/cryptographyProtocols'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/loadAccountByTokenRepository'
import { DbLoadAccountByToken } from '@/data/usecases/loadAccountByToken/dbLoadAccountByToken'
import { AccountModel } from '@/domain/model/accountModel'

const newFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_valid@email.com',
    password: 'any_password'
})

const newDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt (value: string): Promise<string> {
           return new Promise(resolve => resolve('any_value'))
        }
    }
    return new DecrypterStub()
}

const newLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken (token: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(newFakeAccount()))
        }
    }
    return new LoadAccByTokenRepositoryStub()
}

type SutTypes = {
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const newSut = (): SutTypes => {
    const decrypterStub = newDecrypter()
    const loadAccountByTokenRepositoryStub = newLoadAccountByTokenRepository()
    const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
    return {
        sut,
        decrypterStub,
        loadAccountByTokenRepositoryStub
    }
}

describe('Datadase Load Account By Token Usecase', () => {
    test('Should call Decrypter with correct values', async () => {
        const { sut, decrypterStub } = newSut()
        const load = jest.spyOn(decrypterStub, 'decrypt')
        await sut.load('any_token', 'any_role')
        expect(load).toHaveBeenCalledWith('any_token')
    })

    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterStub } = newSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.load('any_token', 'any_role')
        expect(httpResponse).toBeNull()
    })

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = newSut()
        const loadByTokenSpyOn = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
        await sut.load('any_token', 'any_role')
        expect(loadByTokenSpyOn).toHaveBeenCalledWith('any_token','any_role')
    })

    test('Should return null if LoadAccountByTokenRepository returns null', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = newSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.load('any_token', 'any_role')
        expect(httpResponse).toBeNull()
    })

    test('Should return an account on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load('any_token', 'any_role')
        expect(httpResponse).toEqual(newFakeAccount())
    })

    test('Should throw if Decrypter throws', async () => {
        const { sut, decrypterStub } = newSut()
        jest.spyOn(decrypterStub, 'decrypt')
            .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
        const httpResponse = sut.load('any_token', 'any_role')
        await expect(httpResponse).rejects.toThrow()
    })

    test('Should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = newSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
            .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
        const httpResponse = sut.load('any_token', 'any_role')
        await expect(httpResponse).rejects.toThrow()
    })
})
