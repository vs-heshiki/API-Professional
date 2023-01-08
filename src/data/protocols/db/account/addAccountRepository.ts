import { AccountModel } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'

export interface AddAccountRepository {
    add: (accountData: AddAccountRepository.Params) => Promise<AddAccountRepository.Resolve>
}

export namespace AddAccountRepository {
    export type Params = {
        name: string
        email: string
        password: string
    }

    export type Resolve = AccountModel
}
