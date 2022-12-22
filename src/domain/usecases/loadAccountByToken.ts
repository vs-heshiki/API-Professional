import { AccountModel } from '@/domain/model/accountModel'

export interface LoadAccountByToken {
    load: (token: string, role?: string) => Promise<AccountModel>
}
