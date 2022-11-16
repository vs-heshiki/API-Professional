import { badRequest, serverError, success } from '../../helpers/httpHelpers'
import { MissingParamError, InvalidParamError } from '../../errors'
import { HttpRequest, HttpResponse, EmailValidator, Controller, AddAccount } from './signUpProtocols'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const fieldRequired = ['name', 'email', 'password', 'confirmPassword']
            for (const field of fieldRequired) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const { name, password, confirmPassword, email } = httpRequest.body

            if (password !== confirmPassword) {
                return badRequest(new InvalidParamError('confirmPassword'))
            }

            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

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
