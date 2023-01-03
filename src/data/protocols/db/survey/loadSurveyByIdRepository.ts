import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyByIdRepository {
    loadById: (id: string) => Promise<LoadSurveyByIdRepository.Model>
}

export namespace LoadSurveyByIdRepository {
    export type Model = SurveyModel
}
