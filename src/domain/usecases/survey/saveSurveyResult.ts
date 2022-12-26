import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
    save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
