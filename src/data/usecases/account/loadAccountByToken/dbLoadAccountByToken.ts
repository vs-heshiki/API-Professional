import { LoadAccountByToken, Decrypter, LoadAccountByTokenRepository } from './dbLoadAccountByTokenProtocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}

    async load (token: string, role?: string): Promise<LoadAccountByToken.Resolve> {
        let accessToken: string
        try {
            accessToken = await this.decrypter.decrypt(token)
        } catch (err) {
            return null
        }
        if (accessToken) {
            const accountId = await this.loadAccountByTokenRepository.loadByToken(token, role)
            if (accountId) {
                return accountId
            }
        }
        return null
    }
}
