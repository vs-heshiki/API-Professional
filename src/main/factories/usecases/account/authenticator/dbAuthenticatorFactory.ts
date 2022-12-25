import env from '@/main/config/env'
import { DbAuthenticator } from '@/data/usecases/account/authenticator/dbAuthenticator'
import { BCryptAdapter } from '@/infra/cryptography/bcrypt/bcryptAdapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/accountRepository/accountMongoRepository'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwtAdapter'

export const newDbAuthenticator = (): DbAuthenticator => {
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdapter = new BCryptAdapter()
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    return new DbAuthenticator(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
