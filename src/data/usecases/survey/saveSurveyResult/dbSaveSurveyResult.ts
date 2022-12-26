import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResult, SaveSurveyResultParams } from './dbSaveSurveyResultProtocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly saveSurveyResultRepository: SaveSurveyResultRepository
    ) {}

    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const save = await this.saveSurveyResultRepository.save(data)
        return save
    }
}
