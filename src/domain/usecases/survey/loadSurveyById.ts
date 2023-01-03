import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyById {
    loadById: (id: string) => Promise<LoadSurveyById.Model>
}

export namespace LoadSurveyById {
    export type Model = SurveyModel
}
