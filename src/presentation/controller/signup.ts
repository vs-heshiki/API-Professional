import { HttpResponse, HttpRequest } from './../../protocols/http'
export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.name) {
            return {
                statusCode: 400,
                body: new Error('Input name is empty!')
            }
        }

        if (!httpRequest.body.email) {
            return {
                statusCode: 400,
                body: new Error('Input email is empty!')
            }
        }
    }
}
