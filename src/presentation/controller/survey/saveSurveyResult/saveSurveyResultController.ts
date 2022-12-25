import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyById, Controller, HttpRequest, HttpResponse } from './saveSurveyResultControllerProtocols'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/httpHelpers'

export class SaveSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById
    ) { }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { surveyId } = httpRequest.params
            const { answer } = httpRequest.body
            const survey = await this.loadSurveyById.loadById(surveyId)
            if (survey) {
                const answers = survey.answers.map(a => a.answer)
                if (answers.includes(answer)) {
                    return noContent()
                }
                return forbidden(new InvalidParamError('answer'))
            }
            return forbidden(new InvalidParamError('surveyId'))
        } catch (err) {
            return serverError(err)
        }
    }
}
