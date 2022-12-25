import { LoadSurveysRepository, LoadSurveys, SurveyModel } from './dbLoadSurveysProtocols'

export class DbLoadSurveys implements LoadSurveys {
    constructor (
            private readonly loadSurveysRepository: LoadSurveysRepository
    ) {}

    async load (): Promise<SurveyModel[]> {
        const surveys = await this.loadSurveysRepository.loadAll()
        return surveys
    }
}
