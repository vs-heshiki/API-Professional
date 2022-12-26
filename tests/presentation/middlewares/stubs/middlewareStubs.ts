import { AccountModel } from '@/domain/model/accountModel'
import { LoadAccountByToken } from '@/domain/usecases/account/useCasesAccountProtocols'
import { mockAccount } from '@/tests/mocks'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load (token: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(mockAccount()))
        }
    }
    return new LoadAccountByTokenStub()
}
