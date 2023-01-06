import { DbLoadAccountByToken } from '@/data/usecases/account/loadAccountByToken/dbLoadAccountByToken'
import { LoadAccountByTokenRepositorySpy, DecrypterSpy } from '@/tests/data/usecases/stubs/dbAccountStubs'
import { throwError } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

let token: string
let role: string

type SutTypes = {
    sut: DbLoadAccountByToken
    decrypterSpy: DecrypterSpy
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const newSut = (): SutTypes => {
    const decrypterSpy = new DecrypterSpy()
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
    return {
        sut,
        decrypterSpy,
        loadAccountByTokenRepositorySpy
    }
}

describe('Database LoadAccountByToken Usecase', () => {
    beforeEach(() => {
        token = faker.datatype.uuid()
        role = faker.internet.userName()
    })

    test('Should call Decrypter with correct values', async () => {
        const { sut, decrypterSpy } = newSut()
        await sut.load(token, role)
        expect(decrypterSpy.value).toBe(token)
    })

    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterSpy } = newSut()
        decrypterSpy.decrypt = null
        const account = await sut.load(token, role)
        expect(account).toBeNull()
    })

        test('Should return null if Decrypter throws', async () => {
            const { sut, decrypterSpy } = newSut()
            jest.spyOn(decrypterSpy, 'decrypt')
                .mockImplementationOnce(throwError)
            const account = await sut.load(token, role)
            expect(account).toBeNull()
        })

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = newSut()
        await sut.load(token, role)
        expect(loadAccountByTokenRepositorySpy.token).toBe(token)
        expect(loadAccountByTokenRepositorySpy.role).toBe(role)
    })

    test('Should return null if LoadAccountByTokenRepository returns null', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = newSut()
        loadAccountByTokenRepositorySpy.id = null
        const account = await sut.load(token, role)
        expect(account).toBeNull()
    })

    test('Should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = newSut()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken')
        .mockImplementationOnce(throwError)
        const account = sut.load(token, role)
        await expect(account).rejects.toThrow()
    })

        test('Should return an accountId on success', async () => {
            const { sut, loadAccountByTokenRepositorySpy } = newSut()
            const accountId = await sut.load(token, role)
            expect(accountId).toBe(loadAccountByTokenRepositorySpy.id)
        })
})
