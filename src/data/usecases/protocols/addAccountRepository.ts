import { AccountModel } from '../../../domain/model/accountModel'
import { AddAccountModel } from '../../../domain/usecases/addAccountModel'

export interface AddAccountRepository {
    add: (accountData: AddAccountModel) => Promise<AccountModel>
}
