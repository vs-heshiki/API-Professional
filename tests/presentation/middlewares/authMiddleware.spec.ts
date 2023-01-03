import { AuthMiddleware } from '@/presentation/controller/middlewares/authMiddleware'
import { LoadAccountByToken } from '@/presentation/controller/middlewares/authMiddlewareProtocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, success, serverError } from '@/presentation/helpers/http/httpHelpers'
import { mockAuthMiddlewareRequest, throwError } from '@/tests/mocks'
import { mockLoadAccountByToken } from '@/tests/presentation/middlewares/stubs/middlewareStubs'

type SutTypes = {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken
}

const newSut = (role?: string): SutTypes => {
    const loadAccountByTokenStub = mockLoadAccountByToken()
    const sut = new AuthMiddleware(loadAccountByTokenStub, role)
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
        const role = 'any_role'
        const { sut, loadAccountByTokenStub } = newSut(role)
        const loadSpyOn = jest.spyOn(loadAccountByTokenStub, 'load')
        const request = mockAuthMiddlewareRequest()
        await sut.handle(request)
        expect(loadSpyOn).toHaveBeenCalledWith(request.accessToken, 'any_role')
    })

    test('Should return 403 if LoadAccountByToken returns null', async () => {
        const { sut, loadAccountByTokenStub } = newSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(null)
        const httpResponse = await sut.handle(mockAuthMiddlewareRequest())
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should return 200 if LoadAccountByToken returns an id', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(mockAuthMiddlewareRequest())
        expect(httpResponse).toEqual(success({ accountId: 'any_id' }))
    })

    test('Should return 500 if LoadAccountByToken throws', async () => {
        const { sut, loadAccountByTokenStub } = newSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockAuthMiddlewareRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
