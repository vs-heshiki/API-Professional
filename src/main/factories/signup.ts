import { Controller } from './../../presentation/protocols/controller'
import { AccountMongoRepository } from './../../infra/db/mongodb/accountRepository/account'
import { BCryptAdapter } from './../../infra/cryptography/bcryptAdapter'
import { EmailValidatorAdapter } from './../../utils/emailValidator'
import { DbAddAccount } from '../../data/usecases/addAccount/dbAddAccount'
import { SignUpController } from './../../presentation/controller/signup'
import { LogControllerDecorator } from '../decorators/log'

export const newSignUpController = (): Controller => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BCryptAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUp = new SignUpController(emailValidatorAdapter, dbAddAccount)
    return new LogControllerDecorator(signUp)
}
