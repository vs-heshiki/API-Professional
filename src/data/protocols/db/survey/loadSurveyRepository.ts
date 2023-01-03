import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurveyRepository {
    loadAll: (accountId: string) => Promise<LoadSurveyRepository.Model>
}

export namespace LoadSurveyRepository {
    export type Model = SurveyModel[]
}
