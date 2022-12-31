import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult, LoadSurveyByIdRepository } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResultProtocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
    constructor (
        private readonly loadSurveyResult: LoadSurveyResultRepository,
        private readonly loadSurveyById: LoadSurveyByIdRepository
    ) { }

    async load (surveyId: string): Promise<SurveyResultModel> {
        let surveyResult = await this.loadSurveyResult.loadBySurveyId(surveyId)
        if (!surveyResult) {
            const survey = await this.loadSurveyById.loadById(surveyId)
            surveyResult = {
                surveyId: survey.id,
                question: survey.question,
                date: survey.date,
                answers: survey.answers.map(answer => Object.assign({}, answer, {
                    count: 0,
                    percent: 0
                }))
            }
        }
        return surveyResult
    }
}
