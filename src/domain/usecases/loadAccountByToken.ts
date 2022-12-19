import { AccountModel } from '../../data/usecases/addAccount'

export interface LoadAccountByToken {
    load: (token: string, role?: string) => Promise<AccountModel>
}
