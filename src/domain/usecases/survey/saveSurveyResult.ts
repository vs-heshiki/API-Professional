import { SurveyResultModel } from '@/domain/model/surveyResultModel'

export interface SaveSurveyResult {
    save: (data: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {
    export type Params = {
        surveyId: string
        accountId: string
        answer: string
        date: Date
    }

    export type Model = SurveyResultModel
}
