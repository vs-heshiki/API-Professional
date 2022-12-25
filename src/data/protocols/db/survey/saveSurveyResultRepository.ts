import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResultModel } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export interface SaveSurveyResultRepository {
    save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
