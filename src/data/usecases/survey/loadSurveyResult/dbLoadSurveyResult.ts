import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult, LoadSurveyByIdRepository } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResultProtocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
    constructor (
        private readonly loadSurveyResult: LoadSurveyResultRepository,
        private readonly loadSurveyById: LoadSurveyByIdRepository
    ) { }

    async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
        let surveyResult = await this.loadSurveyResult.loadBySurveyId(surveyId, accountId)
        if (!surveyResult) {
            const survey = await this.loadSurveyById.loadById(surveyId)
            surveyResult = {
                surveyId: survey.id,
                question: survey.question,
                date: survey.date,
                answers: survey.answers.map(answer => Object.assign({}, answer, {
                    count: 0,
                    percent: 0,
                    isCurrentAnswer: false
                }))
            }
        }
        return surveyResult
    }
}
