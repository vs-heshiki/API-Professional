import { LoadAnswersBySurvey, LoadAnswersBySurveyRepository } from './dbLoadAnswersBySurveyProtocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
    constructor (
        private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository
    ) {}

    async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Resolve> {
        return await this.loadAnswersBySurveyRepository.loadAnswers(id)
    }
}
