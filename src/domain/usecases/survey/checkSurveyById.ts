export interface CheckSurveyById {
    checkById: (id: string) => Promise<CheckSurveyById.Resolve>
}

export namespace CheckSurveyById {
    export type Resolve = Boolean
}
