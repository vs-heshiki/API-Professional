import { SurveyModel } from '../model/surveyModel'

export interface LoadSurveys {
    load: () => Promise<SurveyModel[]>
}
