export interface LoadAccountByTokenRepository {
    loadByToken: (token: string, role?: string) => Promise<LoadAccountByTokenRepository.Model>
}

export namespace LoadAccountByTokenRepository {
    export type Model = { accountId: string }
}
