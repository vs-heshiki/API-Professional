import { AccountModel } from '../../usecases/addAccount/dbAddAccountProtocols'

export interface LoadAccountByEmailRepository {
    load: (email: string) => Promise<AccountModel>
}
