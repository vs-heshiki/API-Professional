export interface LoadAnswersBySurveyRepository {
    loadAnswers: (id: string) => Promise<LoadAnswersBySurveyRepository.Resolve>
}

export namespace LoadAnswersBySurveyRepository {
    export type Resolve = string[]
}
