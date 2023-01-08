export interface CheckAccountByEmailRepository {
    checkByEmail: (email: string, role?: string) => Promise<CheckAccountByEmailRepository.Resolve>
}

export namespace CheckAccountByEmailRepository {
    export type Resolve = boolean
}
