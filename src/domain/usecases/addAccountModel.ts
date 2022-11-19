import { AccountModel } from '../../data/usecases/addAccount/dbAddAccountProtocols'

export interface AddAccountModel {
    name: string
    email: string
    password: string
}

export interface AddAccount {
    add: (account: AddAccountModel) => Promise<AccountModel>
}
