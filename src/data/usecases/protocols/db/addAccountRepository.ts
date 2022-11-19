import { AccountModel, AddAccountModel } from '../../addAccount'

export interface AddAccountRepository {
    add: (accountData: AddAccountModel) => Promise<AccountModel>
}
