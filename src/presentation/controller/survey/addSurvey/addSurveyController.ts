import { HttpRequest, HttpResponse, Controller, AddSurvey } from './addSurveyControllerProtocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelpers'
import { Validator } from '@/validations/protocols/validator'

export class AddSurveyController implements Controller {
    constructor (
        private readonly AddSurvey: AddSurvey,
        private readonly validator: Validator
    ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { question, answers } = httpRequest.body
            await this.AddSurvey.add({
                question,
                answers,
                date: new Date()
            })
            return noContent()
        } catch (err) {
            return serverError(err)
        }
    }
}
