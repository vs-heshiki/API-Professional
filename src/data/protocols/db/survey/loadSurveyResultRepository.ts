import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface LoadSurveyResultRepository {
    loadSurveyById: (surveyId: string) => Promise<SurveyResultModel>
}
