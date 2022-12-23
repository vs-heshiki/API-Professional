import { SaveSurveyResultRepository } from '@/data/protocols/db/saveSurveyResultRepository'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases/saveSurveyResult'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly saveSurveyResultRepository: SaveSurveyResultRepository
    ) {}

    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const save = await this.saveSurveyResultRepository.saveResult(data)
        return save
    }
}
