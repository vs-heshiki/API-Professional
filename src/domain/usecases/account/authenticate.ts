import { AuthenticatorModel } from '@/domain/model/autheticatorModel'

export type AuthenticateParams = {
    email: string
    password: string
}

export interface Authenticate {
    auth: (authenticate: AuthenticateParams) => Promise<AuthenticatorModel>
}
