export interface CheckSurveyByIdRepository {
    checkById: (id: string) => Promise<CheckSurveyByIdRepository.Return>
}

export namespace CheckSurveyByIdRepository {
    export type Return = boolean
}
