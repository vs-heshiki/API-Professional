import { HttpRequest, HttpResponse, Controller, LoadSurveys } from './loadSurveysControllerProtocols'
import { success, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'

export class LoadSurveysController implements Controller {
    constructor (
        private readonly loadSurveys: LoadSurveys
        ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const surveys = await this.loadSurveys.load(httpRequest.accountId)
            return surveys.length ? success(surveys) : noContent()
        } catch (err) {
            return serverError(err)
        }
    }
}
