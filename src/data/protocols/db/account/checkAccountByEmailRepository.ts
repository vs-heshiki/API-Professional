export interface CheckAccountByEmailRepository {
    checkByEmail: (email: string, role?: string) => Promise<CheckAccountByEmailRepository.Return>
}

export namespace CheckAccountByEmailRepository {
    export type Return = boolean
}
