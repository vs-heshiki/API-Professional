import { HttpRequest, HttpResponse, Controller, AddAccount, Authenticate } from './signUpControllerProtocols'
import { EmailAlreadyTaken } from '@/presentation/errors/emailAlreadyTakenError'
import { badRequest, serverError, success, forbidden } from '@/presentation/helpers/http/httpHelpers'
import { Validator } from '@/validations/protocols/validator'

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

            const authenticatorModel = await this.authenticate.auth({
                email,
                password
            })

            return success(authenticatorModel)
        } catch (err) {
            return serverError(err)
        }
    }
}
