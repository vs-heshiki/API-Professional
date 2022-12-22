import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveys {
    load: () => Promise<SurveyModel[]>
}
