export interface Authenticate {
    auth: (authenticate: Authenticate.Params) => Promise<Authenticate.Model>
}

export namespace Authenticate {
    export type Params = {
        email: string
        password: string
    }

    export type Model = {
        accessToken: string
        name: string
    }
}
