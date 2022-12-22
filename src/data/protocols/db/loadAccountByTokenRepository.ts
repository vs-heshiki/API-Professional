import { AccountModel } from '@/domain/model/accountModel'

export interface LoadAccountByTokenRepository {
    loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
