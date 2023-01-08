import { LoadSurveyByIdRepository, LoadAnswersBySurvey } from './dbLoadAnswersBySurveyProtocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
    constructor (
        private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    ) {}

    async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Resolve> {
        const survey = await this.loadSurveyByIdRepository.loadById(id)
        return survey?.answers.map(a => a.answer) || []
    }
}
