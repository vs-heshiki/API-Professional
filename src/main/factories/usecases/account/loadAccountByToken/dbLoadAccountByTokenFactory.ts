import env from '@/main/config/env'
import { DbLoadAccountByToken } from '@/data/usecases/account/loadAccountByToken/dbLoadAccountByToken'
import { AccountMongoRepository } from '@/infra/db/mongodb/accountRepository/accountMongoRepository'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwtAdapter'

export const newDbLoadAccountByToken = (): DbLoadAccountByToken => {
    const JWT = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbLoadAccountByToken(JWT, accountMongoRepository)
}
