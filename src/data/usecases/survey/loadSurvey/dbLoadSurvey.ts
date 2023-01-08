import { LoadSurveyRepository, LoadSurvey } from './dbLoadSurveyProtocols'

export class DbLoadSurvey implements LoadSurvey {
    constructor (
            private readonly loadSurveyRepository: LoadSurveyRepository
    ) {}

    async load (accountId: string): Promise<LoadSurvey.Resolve> {
        return this.loadSurveyRepository.loadAll(accountId)
    }
}
