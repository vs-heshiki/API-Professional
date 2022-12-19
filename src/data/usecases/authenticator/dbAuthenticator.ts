import {
    UpdateAccessTokenRepository,
    HashCompare,
    LoadAccountByEmailRepository,
    Authenticate,
    AuthenticateModel,
    Encrypter
} from './'

export class DbAuthenticator implements Authenticate {
    constructor (
        private readonly loadAccountByEmail: LoadAccountByEmailRepository,
        private readonly hashCompare: HashCompare,
        private readonly encrypter: Encrypter,
        private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {}

    async auth (authenticate: AuthenticateModel): Promise<string> {
        const account = await this.loadAccountByEmail.loadByEmail(authenticate.email)
        if (account) {
            const compare = await this.hashCompare.compareHash(authenticate.password, account.password)
            if (compare) {
                const accessToken = await this.encrypter.encrypt(account.id)
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
                return accessToken
            }
        }
        return null
    }
}
