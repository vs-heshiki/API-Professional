import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveysRepository {
    loadAll: (accountId: string) => Promise<SurveyModel[]>
}
