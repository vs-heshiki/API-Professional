import { AccountModel } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'

export interface LoadAccountByEmailRepository {
    loadByEmail: (email: string, role?: string) => Promise<AccountModel>
}
