import { SurveyModel } from '@/domain/model/surveyModel'

export type CreateSurveyModel = Omit<SurveyModel, 'id'>

export interface CreateSurvey {
    create: (data: CreateSurveyModel) => Promise<void>
}
