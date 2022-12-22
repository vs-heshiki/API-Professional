import { Middleware, HttpRequest, HttpResponse, LoadAccountByToken } from './authMiddlewareProtocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, success, serverError } from '@/presentation/helpers/http/httpHelpers'

export class AuthMiddleware implements Middleware {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly role?: string
    ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token']
            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken, this.role)
                if (account) {
                    return success({ accountId: account.id })
                }
            }
            return forbidden(new AccessDeniedError())
        } catch (err) {
            return serverError(err)
        }
    }
}
