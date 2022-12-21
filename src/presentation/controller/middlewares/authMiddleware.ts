import { Middleware, HttpRequest, HttpResponse, LoadAccountByToken } from './authMiddlewareProtocols'
import { forbidden, success, serverError } from '../../helpers/http/httpHelpers'
import { AccessDeniedError } from '../../errors'

export class AuthMiddleware implements Middleware {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
        private role?: string
    ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token']
            if (accessToken) {
                this.role = httpRequest.headers?.role
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
