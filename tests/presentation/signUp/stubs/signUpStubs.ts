import { AddAccount } from '@/domain/usecases/account/useCasesAccountProtocols'
import { mockAccount } from '@/tests/mocks'

export class AddAccountSpy implements AddAccount {
    accountParams: AddAccount.Params
    accountModel = mockAccount()

    async add (account: AddAccount.Params): Promise<AddAccount.Model> {
        this.accountParams = account
        return this.accountModel
    }
}
