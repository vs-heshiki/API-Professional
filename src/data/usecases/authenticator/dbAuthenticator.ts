import { LoadAccountByEmailRepository } from '../../protocols/db/loadAccountByEmailRepository'
import { Authenticate, AuthenticateModel } from './../../../domain/usecases/authenticate'

export class DbAuthenticator implements Authenticate {
    private readonly loadAccountByEmail: LoadAccountByEmailRepository
    constructor (loadAccountByEmail: LoadAccountByEmailRepository) {
        this.loadAccountByEmail = loadAccountByEmail
    }

    async auth (authenticate: AuthenticateModel): Promise<string> {
        await this.loadAccountByEmail.load(authenticate.email)
        return null
    }
}
