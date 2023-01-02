import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, LoadSurveyResult } from './loadSurveyResultControllerProtocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById,
        private readonly loadSurveyResult: LoadSurveyResult
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const accountId = httpRequest.accountId
            const survey = await this.loadSurveyById.loadById(surveyId)
            if (!survey) {
                return forbidden(new InvalidParamError(surveyId))
            }
            const surveyResult = await this.loadSurveyResult.load(surveyId, accountId)
            return success(surveyResult)
        } catch (err) {
            return serverError(err)
        }
    }
}
