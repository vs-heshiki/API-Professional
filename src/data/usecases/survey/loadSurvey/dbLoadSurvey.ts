import { LoadSurveyRepository, LoadSurvey } from './dbLoadSurveyProtocols'

export class DbLoadSurvey implements LoadSurvey {
    constructor (
            private readonly loadSurveyRepository: LoadSurveyRepository
    ) {}

    async load (accountId: string): Promise<LoadSurvey.Model> {
        const surveys = await this.loadSurveyRepository.loadAll(accountId)
        return surveys
    }
}
