import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyById {
    loadById: (id: string) => Promise<SurveyModel>
}
