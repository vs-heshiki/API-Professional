import { DbLoadAccountByToken } from '../../../../../data/usecases/loadAccountByToken/dbLoadAccountByToken'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/accountRepository/accountMongoRepository'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt/jwtAdapter'
import env from '../../../../config/env'

export const newDbLoadAccountByToken = (): DbLoadAccountByToken => {
    const JWT = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbLoadAccountByToken(JWT, accountMongoRepository)
}
