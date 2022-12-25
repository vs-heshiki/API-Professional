import { AddSurveyModel } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export interface AddSurveyRepository {
    add: (surveyData: AddSurveyModel) => Promise<void>
}
