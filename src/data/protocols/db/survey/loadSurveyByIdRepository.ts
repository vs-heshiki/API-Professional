import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyByIdRepository {
    loadById: (id: string) => Promise<SurveyModel>
}
