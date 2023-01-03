import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface LoadSurveyResultRepository {
    loadBySurveyId: (surveyId: string, accountId: string) => Promise<LoadSurveyResultRepository.Model>
}

export namespace LoadSurveyResultRepository {
    export type Model = SurveyResultModel
}
