export interface Authenticate {
    auth: (authenticate: Authenticate.Params) => Promise<Authenticate.Resolve>
}

export namespace Authenticate {
    export type Params = {
        email: string
        password: string
    }

    export type Resolve = {
        accessToken: string
        name: string
    }
}
