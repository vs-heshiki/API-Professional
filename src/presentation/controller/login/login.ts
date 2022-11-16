import { HttpRequest, HttpResponse, Controller, Authenticate, EmailValidator } from './loginProtocols'
import { serverError, badRequest, unauthorized } from '../../helpers/httpHelpers'
import { MissingParamError, InvalidParamError } from '../../errors'

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly authenticate: Authenticate

    constructor (emailValidator: EmailValidator, authenticate: Authenticate) {
        this.emailValidator = emailValidator
        this.authenticate = authenticate
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const fieldRequired = ['email', 'password']
            for (const field of fieldRequired) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { email, password } = httpRequest.body

            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

        const accessToken = await this.authenticate.auth(email, password)
        if (!accessToken) {
            return unauthorized()
        }
        } catch (err) {
            return serverError(err)
        }
    }
}
