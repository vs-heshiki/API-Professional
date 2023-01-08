import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyRepository {
    loadAll: (accountId: string) => Promise<LoadSurveyRepository.Resolve>
}

export namespace LoadSurveyRepository {
    export type Resolve = SurveyModel[]
}
