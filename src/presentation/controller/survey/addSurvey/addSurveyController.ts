import { HttpRequest, HttpResponse, Controller, CreateSurvey } from './addSurveyControllerProtocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelpers'
import { Validator } from '@/validations/protocols/validator'

export class AddSurveyController implements Controller {
    constructor (
        private readonly createSurvey: CreateSurvey,
        private readonly validator: Validator
    ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { question, answers } = httpRequest.body
            await this.createSurvey.create({
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
