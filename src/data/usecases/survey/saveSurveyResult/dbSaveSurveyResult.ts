import { SaveSurveyResultRepository, SaveSurveyResult, LoadSurveyResultRepository } from './dbSaveSurveyResultProtocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
        private readonly loadSurveyResultRepository: LoadSurveyResultRepository
    ) {}

    async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
        await this.saveSurveyResultRepository.save(data)
        const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
        return surveyResult
    }
}
