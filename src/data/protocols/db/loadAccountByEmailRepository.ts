import { AccountModel } from '../../usecases/addAccount'

export interface LoadAccountByEmailRepository {
    load: (email: string) => Promise<AccountModel>
}
