import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult, LoadSurveyByIdRepository } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResultProtocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
    constructor (
        private readonly loadSurveyResult: LoadSurveyResultRepository,
        private readonly loadSurveyById: LoadSurveyByIdRepository
    ) {}

    async load (surveyId: string): Promise<SurveyResultModel> {
        const surveyResult = await this.loadSurveyResult.loadBySurveyId(surveyId)
        if (!surveyResult) {
            await this.loadSurveyById.loadById(surveyId)
        }
        return surveyResult
    }
}
