import { LoadAccountByToken } from '../../../domain/usecases/loadAccountByToken'
import { Decrypter } from '../../protocols/cryptography/cryptographyProtocols'
import { AccountModel } from '../../../domain/model/accountModel'
import { LoadAccountByTokenRepository } from '../../protocols/db/loadAccountByTokenRepository'

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}

    async load (token: string, role?: string): Promise<AccountModel> {
        const accessToken = await this.decrypter.decrypt(token)
        if (accessToken) {
            const account = await this.loadAccountByTokenRepository.loadByToken(token, role)
            if (account) {
                return account
            }
        }
        return null
    }
}
