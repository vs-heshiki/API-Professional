export interface CheckSurveyByIdRepository {
    checkById: (id: string) => Promise<CheckSurveyByIdRepository.Resolve>
}

export namespace CheckSurveyByIdRepository {
    export type Resolve = boolean
}
