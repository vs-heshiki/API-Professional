import { success, serverError, noContent } from './../../../helpers/http/httpHelpers'
import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './loadSurveysControllerProtocols'

export class LoadSurveyController implements Controller {
    constructor (
        private readonly loadSurveys: LoadSurveys
        ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const surveys = await this.loadSurveys.load()
            return surveys.length ? success(surveys) : noContent()
        } catch (err) {
            return serverError(err)
        }
    }
}
