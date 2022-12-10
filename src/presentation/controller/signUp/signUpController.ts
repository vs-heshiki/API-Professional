import { EmailAlreadyTaken } from '../../errors/emailAlreadyTaken'
import { badRequest, serverError, success, forbidden } from '../../helpers/http/httpHelpers'
import { HttpRequest, HttpResponse, Controller, AddAccount, Validator, Authenticate } from './signUpControllerProtocols'

export class SignUpController implements Controller {
    constructor (
        private readonly addAccount: AddAccount,
        private readonly validator: Validator,
        private readonly authenticate: Authenticate
        ) {}

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

            if (!account) {
                return forbidden(new EmailAlreadyTaken())
            }

            const accessToken = await this.authenticate.auth({
                email,
                password
            })

            return success({ accessToken })
        } catch (err) {
            return serverError(err)
        }
    }
}
