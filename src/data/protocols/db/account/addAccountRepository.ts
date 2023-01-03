import { AddAccount } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'

export interface AddAccountRepository {
    add: (accountData: AddAccount.Params) => Promise<AddAccount.Model>
}
