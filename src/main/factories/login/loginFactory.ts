import { Controller } from './../../../presentation/protocols/controller'
import { LoginController } from './../../../presentation/controller/login/loginController'
import { BCryptAdapter } from './../../../infra/cryptography/bcrypt/bcryptAdapter'
import { AccountMongoRepository } from './../../../infra/db/mongodb/accountRepository/accountMongoRepository'
import { LogMongoRepository } from '../../../infra/db/mongodb/logRepository/logMongoRepository'
import { JwtAdapter } from '../../../infra/cryptography/jwt/jwtAdapter'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'
import { DbAuthenticator } from '../../../data/usecases/authenticator/dbAuthenticatorProtocols'
import { newLoginValidator } from './loginValidatorFactory'
import env from '../../config/env'

export const newLoginController = (): Controller => {
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdapter = new BCryptAdapter()
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const dbAuthenticator = new DbAuthenticator(accountMongoRepository, bcryptAdapter, jwtAdapter,accountMongoRepository)
    const loginController = new LoginController(dbAuthenticator, newLoginValidator())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}
