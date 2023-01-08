import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyByIdRepository {
    loadById: (id: string) => Promise<LoadSurveyByIdRepository.Resolve>
}

export namespace LoadSurveyByIdRepository {
    export type Resolve = SurveyModel
}
