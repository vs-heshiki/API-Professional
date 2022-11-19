import {
    UpdateAccessTokenRepository,
    HashCompare,
    LoadAccountByEmailRepository,
    Authenticate,
    AuthenticateModel,
    TokenGenerator
} from './dbAuthenticatorProtocols'

export class DbAuthenticator implements Authenticate {
    private readonly loadAccountByEmail: LoadAccountByEmailRepository
    private readonly hashCompare: HashCompare
    private readonly tokenGenerator: TokenGenerator
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

    constructor (
        loadAccountByEmail: LoadAccountByEmailRepository,
        hashCompare: HashCompare,
        tokenGenerator: TokenGenerator,
        updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {
        this.loadAccountByEmail = loadAccountByEmail
        this.hashCompare = hashCompare
        this.tokenGenerator = tokenGenerator
        this.updateAccessTokenRepository = updateAccessTokenRepository
    }

    async auth (authenticate: AuthenticateModel): Promise<string> {
        const account = await this.loadAccountByEmail.load(authenticate.email)
        if (account) {
            const compare = await this.hashCompare.compare(authenticate.password, account.password)
            if (compare) {
                const accessToken = await this.tokenGenerator.generate(account.id)
                await this.updateAccessTokenRepository.update(account.id, accessToken)
                return accessToken
            }
        }
        return null
    }
}
