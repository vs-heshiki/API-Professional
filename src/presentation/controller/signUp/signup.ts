import { badRequest, serverError, success } from '../../helpers/http/httpHelpers'
import { HttpRequest, HttpResponse, Controller, AddAccount, Validator } from './signUpProtocols'

export class SignUpController implements Controller {
    private readonly addAccount: AddAccount
    private readonly validator: Validator

    constructor (addAccount: AddAccount, validator: Validator) {
        this.addAccount = addAccount
        this.validator = validator
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { name, password, email } = httpRequest.body

            const account = await this.addAccount.add({
                name,
                email,
                password
            })
            return success(account)
        } catch (err) {
            return serverError(err)
        }
    }
}
