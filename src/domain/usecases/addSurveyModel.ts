export type SurveyAnswer = {
    image?: string
    answer: string
}

export type CreateSurveyModel = {
    question: string
    answers: SurveyAnswer[]
    date: Date
}

export interface CreateSurvey {
    create: (data: CreateSurveyModel) => Promise<void>
}
