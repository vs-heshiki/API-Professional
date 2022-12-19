import { AccountModel } from '../../usecases/addAccount/dbAddAccountProtocols'

export interface LoadAccountByEmailRepository {
    loadByEmail: (email: string, role?: string) => Promise<AccountModel>
}
