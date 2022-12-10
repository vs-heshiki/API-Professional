import { newLogControllerDecorator } from './../../decorators/logControllerDecorator'
import { newDbAuthenticator } from './../../usecases/authenticator/dbAuthenticatorFactory'
import { Controller } from '../../../../presentation/protocols/controller'
import { LoginController } from '../../../../presentation/controller/login/loginController'
import { newLoginValidator } from './loginValidatorFactory'

export const newLoginController = (): Controller => {
    const loginController = new LoginController(newDbAuthenticator(), newLoginValidator())
    return newLogControllerDecorator(loginController)
}
