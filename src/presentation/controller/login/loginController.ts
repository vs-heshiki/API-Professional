import { HttpRequest, HttpResponse, Controller, Authenticate, Validator } from './loginControllerProtocols'
import { serverError, badRequest, unauthorized, success } from '../../helpers/http/httpHelpers'

export class LoginController implements Controller {
    constructor (
        private readonly authenticate: Authenticate,
        private readonly validator: Validator
        ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { email, password } = httpRequest.body

        const accessToken = await this.authenticate.auth({ email, password })
        if (!accessToken) {
            return unauthorized()
        }
        return success({ accessToken })
        } catch (err) {
            return serverError(err)
        }
    }
}
