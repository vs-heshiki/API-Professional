import { SignUpController } from '../../../presentation/controller/signUp/signUpController'
import { newSignUpValidator } from './signupValidatorFactory'
import { Controller } from '../../../presentation/protocols/controller'
import { AccountMongoRepository } from '../../../infra/db/mongodb/accountRepository/accountMongoRepository'
import { BCryptAdapter } from '../../../infra/cryptography/bcrypt/bcryptAdapter'
import { DbAddAccount } from '../../../data/usecases/addAccount/dbAddAccount'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/logRepository/logMongoRepository'

export const newSignUpController = (): Controller => {
    const bcryptAdapter = new BCryptAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpController = new SignUpController(dbAddAccount, newSignUpValidator())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpController, logMongoRepository)
}
