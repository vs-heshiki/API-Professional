export type AuthenticateParams = {
    email: string
    password: string
}

export interface Authenticate {
    auth: (authenticate: AuthenticateParams) => Promise<string>
}
