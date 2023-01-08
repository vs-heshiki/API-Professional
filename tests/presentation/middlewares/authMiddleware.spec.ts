import { AuthMiddleware } from '@/presentation/controller/middlewares/authMiddleware'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, success, serverError } from '@/presentation/helpers/http/httpHelpers'
import { mockAuthMiddlewareRequest, throwError } from '@/tests/mocks'
import { LoadAccountByTokenSpy } from '@/tests/presentation/middlewares/stubs/middlewareStubs'

type SutTypes = {
    sut: AuthMiddleware
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const newSut = (role?: string): SutTypes => {
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
    return {
        sut,
        loadAccountByTokenSpy
    }
}

describe('AuthMiddleware', () => {
    const request = mockAuthMiddlewareRequest()
    const role = 'any_role'

    test('Should return 403 if an AccessToken not exists on headers', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct access token and role', async () => {
        const { sut, loadAccountByTokenSpy } = newSut(role)
        await sut.handle(request)
        expect(loadAccountByTokenSpy.token).toBe(request.accessToken)
        expect(loadAccountByTokenSpy.role).toBe(role)
    })

    test('Should return 403 if LoadAccountByToken returns null', async () => {
        const { sut, loadAccountByTokenSpy } = newSut()
        loadAccountByTokenSpy.id = null
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should return 200 if LoadAccountByToken returns an id', async () => {
        const { sut, loadAccountByTokenSpy } = newSut()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(success(loadAccountByTokenSpy.id))
    })

    test('Should return 500 if LoadAccountByToken throws', async () => {
        const { sut, loadAccountByTokenSpy } = newSut()
        jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
