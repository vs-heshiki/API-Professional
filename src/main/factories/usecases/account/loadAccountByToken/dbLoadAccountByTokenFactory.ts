import env from '@/main/config/env'
import { DbLoadAccountByToken } from '@/data/usecases/account/loadAccountByToken/dbLoadAccountByToken'
import { AccountMongoRepository } from '@/infra/db/mongodb/accountRepository/accountMongoRepository'
import { JwtAdapter } from '@/infra/cryptography/jwt/jwtAdapter'
import { LoadAccountByToken } from '@/domain/usecases/account/loadAccountByToken'

export const newDbLoadAccountByToken = (): LoadAccountByToken => {
    const JWT = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbLoadAccountByToken(JWT, accountMongoRepository)
}
