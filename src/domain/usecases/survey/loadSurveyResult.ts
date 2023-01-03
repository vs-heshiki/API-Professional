import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface LoadSurveyResult {
    load: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}

export namespace LoadSurveyResult {
    export type Model = SurveyResultModel
}
