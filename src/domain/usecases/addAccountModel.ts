import { AccountModel } from '@/domain/model/accountModel'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
    add: (account: AddAccountModel) => Promise<AccountModel>
}
