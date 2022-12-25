import { DbAddAccount } from '@/data/usecases/account/addAccount/dbAddAccount'
import { AccountMongoRepository } from '@/infra/db/mongodb/accountRepository/accountMongoRepository'
import { BCryptAdapter } from '@/infra/cryptography/bcrypt/bcryptAdapter'

export const newDbAddAccount = (): DbAddAccount => {
    const bcryptAdapter = new BCryptAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
