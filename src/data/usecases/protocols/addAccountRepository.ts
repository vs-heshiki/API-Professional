import { AccountModel, AddAccountModel } from '../../../data/usecases/addAccount'

export interface AddAccountRepository {
    add: (accountData: AddAccountModel) => Promise<AccountModel>
}
