import { badRequest } from '../helpers/badRequest'
import { MissingParamError } from '../errors/missingParamError'
import { HttpResponse, HttpRequest } from '../protocols/http'

export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse {
        const fieldRequired = ['name', 'email', 'password', 'confirmPassword']
        for (const field of fieldRequired) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
    }
}
