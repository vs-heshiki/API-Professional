import { AccountModel } from '../../usecases/addAccount'

export interface LoadAccountByEmailRepository {
    loadByEmail: (email: string, role?: string) => Promise<AccountModel>
}
