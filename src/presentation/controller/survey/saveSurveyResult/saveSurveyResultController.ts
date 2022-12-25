import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyById, Controller, HttpRequest, HttpResponse } from './saveSurveyResultControllerProtocols'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/httpHelpers'

export class SaveSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
            if (survey) {
                return noContent()
            }
            return forbidden(new InvalidParamError('surveyId'))
        } catch (err) {
            return serverError(err)
        }
    }
}
