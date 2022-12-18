import { CreateSurveyModel } from '../../../domain/usecases/addSurveyModel'

export interface AddSurveyRepository {
    add: (surveyData: CreateSurveyModel) => Promise<void>
}
