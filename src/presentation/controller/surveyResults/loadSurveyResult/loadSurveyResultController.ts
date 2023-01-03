import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { Controller, HttpResponse, LoadSurveyById, LoadSurveyResult } from './loadSurveyResultControllerProtocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById,
        private readonly loadSurveyResult: LoadSurveyResult
    ) { }

    async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
        try {
            const { surveyId, accountId } = request
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

export namespace LoadSurveyResultController {
    export type Request = {
        surveyId: string
        accountId: string
    }
}
