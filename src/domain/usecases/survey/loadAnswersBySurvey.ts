export interface LoadAnswersBySurvey {
    loadAnswers: (id: string) => Promise<LoadAnswersBySurvey.Resolve>
}

export namespace LoadAnswersBySurvey {
    export type Resolve = string[]
}
