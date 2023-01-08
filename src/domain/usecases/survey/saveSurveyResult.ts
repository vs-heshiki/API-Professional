import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface SaveSurveyResult {
    save: (data: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Resolve>
}

export namespace SaveSurveyResult {
    export type Params = {
        surveyId: string
        accountId: string
        answer: string
        date: Date
    }

    export type Resolve = SurveyResultModel
}
