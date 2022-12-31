import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface LoadSurveyResultRepository {
    loadBySurveyId: (surveyId: string) => Promise<SurveyResultModel>
}
