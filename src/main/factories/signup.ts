import { AccountMongoRepository } from './../../infra/db/mongodb/accountRepository/account'
import { BCryptAdapter } from './../../infra/cryptography/bcryptAdapter'
import { EmailValidatorAdapter } from './../../utils/emailValidator'
import { DbAddAccount } from '../../data/usecases/addAccount/dbAddAccount'
import { SignUpController } from './../../presentation/controller/signup'

export const newSignUpController = (): SignUpController => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BCryptAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
