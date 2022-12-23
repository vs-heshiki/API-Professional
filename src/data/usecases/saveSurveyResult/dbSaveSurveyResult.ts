import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResult, SaveSurveyResultModel } from './dbSaveSurveyResultProtocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly saveSurveyResultRepository: SaveSurveyResultRepository
    ) {}

    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const save = await this.saveSurveyResultRepository.saveResult(data)
        return save
    }
}
