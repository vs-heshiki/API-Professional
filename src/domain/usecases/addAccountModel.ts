import { AccountModel } from '@/domain/model/accountModel'

export interface AddAccountModel {
    name: string
    email: string
    password: string
}

export interface AddAccount {
    add: (account: AddAccountModel) => Promise<AccountModel>
}
