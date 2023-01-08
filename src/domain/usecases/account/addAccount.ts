import { AccountModel } from '@/domain/model/accountModel'

export interface AddAccount {
    add: (account: AddAccount.Params) => Promise<AddAccount.Resolve>
}

export namespace AddAccount {
    export type Params = {
        name: string
        email: string
        password: string
    }

    export type Resolve = AccountModel
}
