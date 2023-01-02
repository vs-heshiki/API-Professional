import { LoadAccountByToken, Decrypter, AccountModel, LoadAccountByTokenRepository } from './dbLoadAccountByTokenProtocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}

    async load (token: string, role?: string): Promise<AccountModel> {
        let accessToken: string
        try {
            accessToken = await this.decrypter.decrypt(token)
        } catch (err) {
            return null
        }
        if (accessToken) {
            const account = await this.loadAccountByTokenRepository.loadByToken(token, role)
            if (account) {
                return account
            }
        }
        return null
    }
}
