import { AddSurveyModel } from '@/domain/usecases/addSurvey'

export interface AddSurveyRepository {
    add: (surveyData: AddSurveyModel) => Promise<void>
}
