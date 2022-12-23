import { AddSurveyRepository, AddSurvey, AddSurveyModel } from './dbAddSurveyProtocols'

export class DbAddSurvey implements AddSurvey {
    constructor (
        private readonly addSurveyRepository: AddSurveyRepository
        ) {}

    async add (data: AddSurveyModel): Promise<void> {
        await this.addSurveyRepository.add(data)
    }
}
