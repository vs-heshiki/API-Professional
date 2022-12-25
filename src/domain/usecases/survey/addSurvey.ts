import { SurveyModel } from '@/domain/model/surveyModel'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export interface AddSurvey {
    add: (data: AddSurveyModel) => Promise<void>
}
