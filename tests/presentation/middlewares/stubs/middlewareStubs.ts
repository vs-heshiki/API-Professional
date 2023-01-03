import { LoadAccountByToken } from '@/domain/usecases/account/useCasesAccountProtocols'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load (token: string, role?: string): Promise<LoadAccountByToken.Model> {
            return Promise.resolve({ accountId: 'any_id' })
        }
    }
    return new LoadAccountByTokenStub()
}
