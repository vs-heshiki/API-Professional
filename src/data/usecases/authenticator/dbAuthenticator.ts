import { HashCompare } from '../../protocols/cryptography/hashCompare'
import { LoadAccountByEmailRepository } from '../../protocols/db/loadAccountByEmailRepository'
import { Authenticate, AuthenticateModel } from './../../../domain/usecases/authenticate'

export class DbAuthenticator implements Authenticate {
    private readonly loadAccountByEmail: LoadAccountByEmailRepository
    private readonly hashCompare: HashCompare

    constructor (loadAccountByEmail: LoadAccountByEmailRepository, hashCompare: HashCompare) {
        this.loadAccountByEmail = loadAccountByEmail
        this.hashCompare = hashCompare
    }

    async auth (authenticate: AuthenticateModel): Promise<string> {
        const account = await this.loadAccountByEmail.load(authenticate.email)
        if (account) {
            await this.hashCompare.compare(authenticate.password, account.password)
        }
        return null
    }
}
