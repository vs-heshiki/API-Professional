import { AccountModel } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'

export interface AddAccountRepository {
    add: (accountData: AddAccountRepository.Params) => Promise<AddAccountRepository.Model>
}

export namespace AddAccountRepository {
    export type Params = {
        name: string
        email: string
        password: string
    }

    export type Model = AccountModel
}
