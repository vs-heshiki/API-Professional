import { SaveSurveyResultRepository, SaveSurveyResult, LoadSurveyResultRepository } from './dbSaveSurveyResultProtocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
        private readonly loadSurveyResultRepository: LoadSurveyResultRepository
    ) {}

    async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Resolve> {
        await this.saveSurveyResultRepository.save(data)
        return this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    }
}
