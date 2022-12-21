export interface SurveyAnswer {
    image?: string
    answer: string
}

export interface CreateSurveyModel {
    question: string
    answers: SurveyAnswer[]
    date: Date
}

export interface CreateSurvey {
    create: (data: CreateSurveyModel) => Promise<void>
}
