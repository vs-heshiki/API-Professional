import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
    save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
