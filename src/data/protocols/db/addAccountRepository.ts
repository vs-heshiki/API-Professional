import { AccountModel, AddAccountModel } from '@/data/usecases/addAccount/dbAddAccountProtocols'

export interface AddAccountRepository {
    add: (accountData: AddAccountModel) => Promise<AccountModel>
}
