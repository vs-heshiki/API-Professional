import { LoadSurveyByIdRepository, LoadSurveyById } from './dbLoadSurveyByIdProtocols'

export class DbLoadSurveyById implements LoadSurveyById {
    constructor (
        private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    ) {}

    async loadById (id: string): Promise<LoadSurveyById.Model> {
        const survey = await this.loadSurveyByIdRepository.loadById(id)
        return survey
    }
}
