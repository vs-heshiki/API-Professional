import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface LoadSurveyResult {
    load: (surveyId: string) => Promise<SurveyResultModel>
}
