import { HttpResponse, Controller, LoadSurvey } from './loadSurveyControllerProtocols'
import { success, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'

export class LoadSurveyController implements Controller {
    constructor (
        private readonly loadSurvey: LoadSurvey
        ) {}

    async handle (request: LoadSurveyController.Request): Promise<HttpResponse> {
        try {
            const surveys = await this.loadSurvey.load(request.accountId)
            return surveys.length ? success(surveys) : noContent()
        } catch (err) {
            return serverError(err)
        }
    }
}

export namespace LoadSurveyController {
    export type Request = {
        accountId: string
    }
}
