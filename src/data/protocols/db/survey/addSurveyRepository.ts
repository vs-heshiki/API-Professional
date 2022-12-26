import { AddSurveyParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export interface AddSurveyRepository {
    add: (surveyData: AddSurveyParams) => Promise<void>
}
