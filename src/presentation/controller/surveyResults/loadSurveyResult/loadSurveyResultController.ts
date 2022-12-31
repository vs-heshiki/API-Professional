import { forbidden } from '@/presentation/helpers/http/httpHelpers'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './loadSurveyResultControllerProtocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            const { surveyId } = httpRequest.params
            const survey = await this.loadSurveyById.loadById(surveyId)
            if (!survey) {
                return forbidden(new InvalidParamError(surveyId))
            }
            return null
    }
}
