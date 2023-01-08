export interface LoadAccountByToken {
    load: (token: string, role?: string) => Promise<LoadAccountByToken.Resolve>
}

export namespace LoadAccountByToken {
    export type Resolve = { accountId: string }
}
