import { AccountModel, AddAccountModel } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'

export interface AddAccountRepository {
    add: (accountData: AddAccountModel) => Promise<AccountModel>
}
