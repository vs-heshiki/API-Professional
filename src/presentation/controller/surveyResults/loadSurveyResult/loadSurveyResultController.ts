import { forbidden, serverError } from '@/presentation/helpers/http/httpHelpers'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './loadSurveyResultControllerProtocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const survey = await this.loadSurveyById.loadById(surveyId)
            if (!survey) {
                return forbidden(new InvalidParamError(surveyId))
            }
            return null
        } catch (err) {
            return serverError(err)
        }
    }
}
