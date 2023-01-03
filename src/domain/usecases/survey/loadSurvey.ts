import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurvey {
    load: (accountId: string) => Promise<SurveyModel[]>
}
