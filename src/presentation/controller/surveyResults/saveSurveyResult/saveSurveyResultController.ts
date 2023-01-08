import { InvalidParamError } from '@/presentation/errors'
import { Controller, HttpResponse, LoadAnswersBySurvey, SaveSurveyResult } from './saveSurveyResultControllerProtocols'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'

export class SaveSurveyResultController implements Controller {
    constructor (
        private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
        private readonly saveSurveyResult: SaveSurveyResult
    ) { }

    async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
        try {
            const { surveyId, answer } = request
            const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)
            if (!answers.length) {
                return forbidden(new InvalidParamError('surveyId'))
            } else if (!answers.includes(answer)) {
                return forbidden(new InvalidParamError('answer'))
            }
            const surveyResult = await this.saveSurveyResult.save({
                ...request,
                date: new Date()
            })
            return success(surveyResult)
        } catch (err) {
            return serverError(err)
        }
    }
}

export namespace SaveSurveyResultController {
    export type Request = {
        surveyId: string
        accountId: string
        answer: string
    }
}
