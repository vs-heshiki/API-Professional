import { AccountModel } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'

export interface LoadAccountByEmailRepository {
    loadByEmail: (email: string, role?: string) => Promise<LoadAccountByEmailRepository.Model>
}

export namespace LoadAccountByEmailRepository {
    export type Model = AccountModel
}
