import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/loadSurveyResultRepository'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { LoadSurveyResult } from '@/domain/usecases/survey/loadSurveyResult'

export class DbLoadSurveyResult implements LoadSurveyResult {
    constructor (
        private readonly loadSurveyResult: LoadSurveyResultRepository
    ) {}

    async load (surveyId: string): Promise<SurveyResultModel> {
        const result = await this.loadSurveyResult.loadSurveyById(surveyId)
        return result
    }
}
