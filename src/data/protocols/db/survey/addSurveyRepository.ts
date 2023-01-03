export interface AddSurveyRepository {
    add: (surveyData: AddSurveyRepository.Params) => Promise<void>
}

export namespace AddSurveyRepository {
    export type Params = {
        question: string
        answers: SurveyAnswerModel[]
        date: Date
        didAnswer?: boolean
    }

    type SurveyAnswerModel = {
        image?: string
        answer: string
    }
}
