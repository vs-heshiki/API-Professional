import { HttpResponse, Controller, Authenticate } from './signInControllerProtocols'
import { serverError, badRequest, unauthorized, success } from '@/presentation/helpers/http/httpHelpers'
import { Validator } from '@/validations/protocols/validator'

export class SignInController implements Controller {
    constructor (
        private readonly authenticate: Authenticate,
        private readonly validator: Validator
        ) {}

    async handle (request: SignInController.Request): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(request)
            if (error) {
                return badRequest(error)
            }

            const { email, password } = request

        const authenticatorModel = await this.authenticate.auth({ email, password })
        if (!authenticatorModel) {
            return unauthorized()
        }
        return success(authenticatorModel)
        } catch (err) {
            return serverError(err)
        }
    }
}

export namespace SignInController {
    export type Request = {
        email: string
        password: string
    }
}
