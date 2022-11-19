import { AccountModel } from '../../../data/usecases/addAccount'

export interface LoadAccountByEmailRepository {
    load: (email: string) => Promise<AccountModel>
}
