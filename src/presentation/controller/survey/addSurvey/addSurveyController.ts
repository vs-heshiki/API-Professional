import { HttpResponse, Controller, AddSurvey } from './addSurveyControllerProtocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/httpHelpers'
import { Validator } from '@/validations/protocols/validator'

export class AddSurveyController implements Controller {
    constructor (
        private readonly AddSurvey: AddSurvey,
        private readonly validator: Validator
    ) {}

    async handle (request: AddSurveyController.Request): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(request)
            if (error) {
                return badRequest(error)
            }

            const { question, answers } = request
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

export namespace AddSurveyController {
    export type Request = {
        question: string
        answers: Survey[]
    }

    type Survey = {
        image?: string
        answer: string
    }
}
