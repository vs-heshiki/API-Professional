import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResultModel } from '@/domain/usecases/saveSurveyResult'

export interface SaveSurveyResultRepository {
    saveResult: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
