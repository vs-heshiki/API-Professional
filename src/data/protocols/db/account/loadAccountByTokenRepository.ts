export interface LoadAccountByTokenRepository {
    loadByToken: (token: string, role?: string) => Promise<LoadAccountByTokenRepository.Resolve>
}

export namespace LoadAccountByTokenRepository {
    export type Resolve = {
        accountId: string
    }
}
