import { LoadSurveysRepository } from './../../protocols/db/LoadSurveysRepository'
import { LoadSurveys } from './../../../domain/usecases/loadSurveysModel'
import { SurveyModel } from './../../../domain/model/surveyModel'

export class DbLoadSurveys implements LoadSurveys {
    constructor (
            private readonly loadSurveyRepository: LoadSurveysRepository
    ) {}

    async load (): Promise<SurveyModel[]> {
        await this.loadSurveyRepository.loadAll()
        return []
    }
}
