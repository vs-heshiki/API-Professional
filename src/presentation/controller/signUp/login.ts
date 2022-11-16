import { HttpRequest, HttpResponse } from './../../protocols/http'
import { Controller } from './../../protocols/controller'
import { badRequest } from '../../helpers/httpHelpers'
import { MissingParamError } from '../../errors'

export class LoginController implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body.email) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
        }

        if (!httpRequest.body.password) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
        }
    }
}
