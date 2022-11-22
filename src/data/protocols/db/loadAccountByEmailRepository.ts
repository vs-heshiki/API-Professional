import { AccountModel } from '../../usecases/addAccount/dbAddAccountProtocols'

export interface LoadAccountByEmailRepository {
    loadAccByEmail: (email: string) => Promise<AccountModel>
}
