import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface LoadSurveyResult {
    load: (surveyId: string, accountId: string) => Promise<LoadSurveyResult.Resolve>
}

export namespace LoadSurveyResult {
    export type Resolve = SurveyResultModel
}
