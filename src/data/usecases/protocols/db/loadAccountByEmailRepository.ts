import { AccountModel } from '../../addAccount'

export interface LoadAccountByEmailRepository {
    load: (email: string) => Promise<AccountModel>
}
