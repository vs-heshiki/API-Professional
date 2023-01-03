export interface LoadAccountByToken {
    load: (token: string, role?: string) => Promise<LoadAccountByToken.Model>
}

export namespace LoadAccountByToken {
    export type Model = { accountId: string }
}
