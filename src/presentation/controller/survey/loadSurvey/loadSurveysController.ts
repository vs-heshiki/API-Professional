import { success, serverError } from './../../../helpers/http/httpHelpers'
import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './loadSurveysControllerProtocols'

export class LoadSurveyController implements Controller {
    constructor (
        private readonly loadSurveys: LoadSurveys
        ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const surveys = await this.loadSurveys.load()
            return success(surveys)
        } catch (err) {
            return serverError(err)
        }
    }
}
