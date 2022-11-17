import { badRequest, serverError, success } from '../../helpers/httpHelpers'
import { InvalidParamError } from '../../errors'
import { HttpRequest, HttpResponse, EmailValidator, Controller, AddAccount, Validator } from './signUpProtocols'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    private readonly validator: Validator

    constructor (emailValidator: EmailValidator, addAccount: AddAccount, validator: Validator) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
        this.validator = validator
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
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
