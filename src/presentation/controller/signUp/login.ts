import { serverError } from './../../helpers/httpHelpers'
import { InvalidParamError } from './../../errors/invalidParamError'
import { EmailValidator } from './../../protocols/emailValidator'
import { HttpRequest, HttpResponse } from './../../protocols/http'
import { Controller } from './../../protocols/controller'
import { badRequest } from '../../helpers/httpHelpers'
import { MissingParamError } from '../../errors'

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const { email, password } = httpRequest.body
        try {
            if (!email) {
                return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
            }

            if (!password) {
                return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
            }

            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
            }
        } catch (err) {
            return serverError(err)
        }
    }
}
