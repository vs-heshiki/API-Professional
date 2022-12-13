import { AccountModel } from '../../usecases/addAccount'

export interface LoadAccountByEmailRepository {
    loadAccByEmail: (email: string) => Promise<AccountModel>
}
