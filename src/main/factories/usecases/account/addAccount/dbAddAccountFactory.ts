import { DbAddAccount } from '@/data/usecases/account/addAccount/dbAddAccount'
import { AccountMongoRepository } from '@/infra/db/mongodb/accountRepository/accountMongoRepository'
import { BCryptAdapter } from '@/infra/cryptography/bcrypt/bcryptAdapter'
import { AddAccount } from '@/domain/usecases/account/addAccount'

export const newDbAddAccount = (): AddAccount => {
    const bcryptAdapter = new BCryptAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
