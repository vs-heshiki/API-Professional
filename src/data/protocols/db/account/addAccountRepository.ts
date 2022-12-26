import { AccountModel, AddAccountParams } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'

export interface AddAccountRepository {
    add: (accountData: AddAccountParams) => Promise<AccountModel>
}
