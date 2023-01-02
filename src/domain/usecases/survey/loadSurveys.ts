import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveys {
    load: (accountId: string) => Promise<SurveyModel[]>
}
