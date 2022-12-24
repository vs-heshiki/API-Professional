import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResultModel } from '@/domain/usecases/saveSurveyResult'

export interface SaveSurveyResultRepository {
    save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
