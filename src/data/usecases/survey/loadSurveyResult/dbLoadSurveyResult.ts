import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResultProtocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
    constructor (
        private readonly loadSurveyResult: LoadSurveyResultRepository
    ) {}

    async load (surveyId: string): Promise<SurveyResultModel> {
        const result = await this.loadSurveyResult.loadSurveyById(surveyId)
        return result
    }
}
