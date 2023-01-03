import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurvey {
    load: (accountId: string) => Promise<LoadSurvey.Model>
}

export namespace LoadSurvey {
    export type Model = SurveyModel[]
}
