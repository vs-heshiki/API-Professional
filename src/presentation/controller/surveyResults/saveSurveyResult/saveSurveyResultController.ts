import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './saveSurveyResultControllerProtocols'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'

export class SaveSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById,
        private readonly saveSurveyResult: SaveSurveyResult
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const { answer } = httpRequest.body
            const { accountId } = httpRequest
            const survey = await this.loadSurveyById.loadById(surveyId)
            if (survey) {
                const answers = survey.answers.map(a => a.answer)
                if (answers.includes(answer)) {
                    const surveyResult = await this.saveSurveyResult.save({
                        surveyId,
                        accountId,
                        answer,
                        date: new Date()
                    })
                    return success(surveyResult)
                }
                return forbidden(new InvalidParamError('answer'))
            }
            return forbidden(new InvalidParamError('surveyId'))
        } catch (err) {
            return serverError(err)
        }
    }
}
