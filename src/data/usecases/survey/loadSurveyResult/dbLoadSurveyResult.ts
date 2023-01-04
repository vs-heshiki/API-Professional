import { LoadSurveyResultRepository, LoadSurveyResult, LoadSurveyByIdRepository } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResultProtocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
    constructor (
        private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
        private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    ) { }

    async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Model> {
        let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)
        if (!surveyResult) {
            const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
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
