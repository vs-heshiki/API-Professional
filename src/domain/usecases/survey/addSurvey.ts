import { SurveyModel } from '@/domain/model/surveyModel'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
    add: (data: AddSurveyParams) => Promise<void>
}
