import { SurveyModel } from '@/domain/model/surveyModel'

export interface LoadSurvey {
    load: (accountId: string) => Promise<LoadSurvey.Resolve>
}

export namespace LoadSurvey {
    export type Resolve = SurveyModel[]
}
