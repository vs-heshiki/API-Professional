import {
    UpdateAccessTokenRepository,
    HashCompare,
    LoadAccountByEmailRepository,
    Authenticate,
    AuthenticateModel,
    Encrypter
} from './dbAuthenticatorProtocols'

export class DbAuthenticator implements Authenticate {
    private readonly loadAccountByEmail: LoadAccountByEmailRepository
    private readonly hashCompare: HashCompare
    private readonly encrypter: Encrypter
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

    constructor (
        loadAccountByEmail: LoadAccountByEmailRepository,
        hashCompare: HashCompare,
        encrypter: Encrypter,
        updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {
        this.loadAccountByEmail = loadAccountByEmail
        this.hashCompare = hashCompare
        this.encrypter = encrypter
        this.updateAccessTokenRepository = updateAccessTokenRepository
    }

    async auth (authenticate: AuthenticateModel): Promise<string> {
        const account = await this.loadAccountByEmail.load(authenticate.email)
        if (account) {
            const compare = await this.hashCompare.compare(authenticate.password, account.password)
            if (compare) {
                const accessToken = await this.encrypter.encrypt(account.id)
                await this.updateAccessTokenRepository.update(account.id, accessToken)
                return accessToken
            }
        }
        return null
    }
}
