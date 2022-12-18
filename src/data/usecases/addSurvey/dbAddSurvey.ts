import { AddSurveyRepository, CreateSurvey, CreateSurveyModel } from './dbAddSurveyProtocols'

export class DbAddSurvey implements CreateSurvey {
    constructor (
        private readonly addSurveyRepository: AddSurveyRepository
        ) {}

    async create (data: CreateSurveyModel): Promise<void> {
        await this.addSurveyRepository.add(data)
    }
}
