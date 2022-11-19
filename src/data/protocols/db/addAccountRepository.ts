import { AccountModel, AddAccountModel } from '../../usecases/addAccount'

export interface AddAccountRepository {
    add: (accountData: AddAccountModel) => Promise<AccountModel>
}
