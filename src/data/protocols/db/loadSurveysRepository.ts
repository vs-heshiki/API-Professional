import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveysRepository {
    loadAll: () => Promise<SurveyModel[]>
}
