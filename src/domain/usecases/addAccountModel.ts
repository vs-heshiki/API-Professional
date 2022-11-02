import { AccountModel } from '../model/accountModel'

export interface AddAccountModel {
    name: string
    email: string
    password: string
}

export interface AddAccount {
    add: (account: AddAccountModel) => AccountModel
}
