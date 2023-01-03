import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyRepository {
    loadAll: (accountId: string) => Promise<SurveyModel[]>
}
