import { LoadSurveyByIdRepository } from '@/data/protocols/db/loadSurveyByIdRepository'
import { SurveyModel } from '@/domain/model/surveyModel'
import { LoadSurveyById } from '@/domain/usecases/loadSurveyById'

export class DbLoadSurveyById implements LoadSurveyById {
    constructor (
        private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    ) {}

    async loadById (id: string): Promise<SurveyModel> {
        const survey = await this.loadSurveyByIdRepository.loadById(id)
        return survey
    }
}
