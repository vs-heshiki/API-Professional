import { AddAccount, AddAccountRepository, Hasher, CheckAccountByEmailRepository } from './dbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
    constructor (
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
    ) {}

    async add (accountData: AddAccount.Params): Promise<AddAccount.Resolve> {
        const check = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
        if (!check) {
            const hashedPassword = await this.hasher.genHash(accountData.password)
            const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
            return newAccount
        }
        return null
    }
}
