import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export interface SaveSurveyResultRepository {
    save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
