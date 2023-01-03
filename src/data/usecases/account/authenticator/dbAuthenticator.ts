import {
    Authenticate,
    Encrypter,
    HashCompare,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
} from './dbAuthtenticatorProtocols'

export class DbAuthenticator implements Authenticate {
    constructor (
        private readonly loadAccountByEmail: LoadAccountByEmailRepository,
        private readonly hashCompare: HashCompare,
        private readonly encrypter: Encrypter,
        private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {}

    async auth (authenticate: Authenticate.Params): Promise<Authenticate.Model> {
        const account = await this.loadAccountByEmail.loadByEmail(authenticate.email)
        if (account) {
            const compare = await this.hashCompare.compareHash(authenticate.password, account.password)
            if (compare) {
                const accessToken = await this.encrypter.encrypt(account.id)
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
                return {
                    accessToken,
                    name: account.name
                }
            }
        }
        return null
    }
}
