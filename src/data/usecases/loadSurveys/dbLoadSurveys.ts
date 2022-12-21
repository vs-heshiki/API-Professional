import { LoadSurveysRepository } from '../../protocols/db/loadSurveysRepository'
import { LoadSurveys } from './../../../domain/usecases/loadSurveysModel'
import { SurveyModel } from './../../../domain/model/surveyModel'

export class DbLoadSurveys implements LoadSurveys {
    constructor (
            private readonly loadSurveyRepository: LoadSurveysRepository
    ) {}

    async load (): Promise<SurveyModel[]> {
        const surveys = await this.loadSurveyRepository.loadAll()
        return surveys
    }
}
