import { AuthMiddleware, HttpRequest, LoadAccountByToken, AccountModel } from '../../../src/presentation/controller/middlewares/authMiddlewareProtocols'
import { forbidden, success, serverError } from '../../../src/presentation/helpers/http/httpHelpers'
import { AccessDeniedError } from '../../../src/presentation/errors'

const newFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'name_valid',
    email: 'any_valid@email.com',
    password: 'hashed_password'
})

const newFakeRequest = (): HttpRequest => ({
    headers: {
        accessToken: 'any_access_token',
        role: 'any_role'
    }
})

const newLoadAccountByToken = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load (token: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(newFakeAccount()))
        }
    }
    return new LoadAccountByTokenStub()
}

interface SutTypes {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken
}

const newSut = (): SutTypes => {
    const loadAccountByTokenStub = newLoadAccountByToken()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    return {
        sut,
        loadAccountByTokenStub
    }
}

describe('AuthMiddleware', () => {
    test('Should return 403 if an AccessToken not exists on headers', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct access token and role', async () => {
        const { sut, loadAccountByTokenStub } = newSut()
        const loadSpyOn = jest.spyOn(loadAccountByTokenStub, 'load')
        await sut.handle(newFakeRequest())
        expect(loadSpyOn).toHaveBeenCalledWith('any_access_token', 'any_role')
    })

    test('Should return 403 if LoadAccountByToken returns null', async () => {
        const { sut, loadAccountByTokenStub } = newSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should return 200 if LoadAccountByToken returns an account', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(success({ accountId: 'valid_id' }))
    })

    test('Should return 500 if LoadAccountByToken throws', async () => {
        const { sut, loadAccountByTokenStub } = newSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
