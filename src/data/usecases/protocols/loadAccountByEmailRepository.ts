import { AccountModel } from './../../../domain/model/accountModel'

export interface LoadAccountByEmailRepository {
    load: (email: string) => Promise<AccountModel>
}
