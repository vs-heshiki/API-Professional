import { AccountModel } from '../../data/usecases/addAccount/dbAddAccountProtocols'

export interface LoadAccountByToken {
    load: (token: string, role?: string) => Promise<AccountModel>
}
