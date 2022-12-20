import { success } from './../../../helpers/http/httpHelpers'
import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './loadSurveysControllerProtocols'

export class LoadSurveyController implements Controller {
    constructor (
        private readonly loadSurveys: LoadSurveys
        ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const surveys = await this.loadSurveys.load()
        return success(surveys)
    }
}
