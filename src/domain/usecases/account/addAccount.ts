import { AccountModel } from '@/domain/model/accountModel'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
    add: (account: AddAccountParams) => Promise<AccountModel>
}
