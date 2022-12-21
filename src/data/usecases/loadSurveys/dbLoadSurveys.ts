import { LoadSurveysRepository } from '../../protocols/db/loadSurveysRepository'
import { LoadSurveys } from './../../../domain/usecases/loadSurveysModel'
import { SurveyModel } from './../../../domain/model/surveyModel'

export class DbLoadSurveys implements LoadSurveys {
    constructor (
            private readonly loadSurveysRepository: LoadSurveysRepository
    ) {}

    async load (): Promise<SurveyModel[]> {
        const surveys = await this.loadSurveysRepository.loadAll()
        return surveys
    }
}
