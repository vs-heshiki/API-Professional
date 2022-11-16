import { Authenticate } from '../../../domain/usecases/authenticate'
import { serverError, badRequest } from '../../helpers/httpHelpers'
import { InvalidParamError } from '../../errors/invalidParamError'
import { EmailValidator } from '../../protocols/emailValidator'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/controller'
import { MissingParamError } from '../../errors'

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

        await this.authenticate.auth(email, password)
        } catch (err) {
            return serverError(err)
        }
    }
}
