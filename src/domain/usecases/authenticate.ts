export type AuthenticateModel = {
    email: string
    password: string
}

export interface Authenticate {
    auth: (authenticate: AuthenticateModel) => Promise<string>
}
