import { newLogControllerDecorator } from './../../decorators/logControllerDecorator'
import { Controller } from '../../../../presentation/protocols/controller'
import { newDbAddAccount } from './../../usecases/addAccount/dbAddAccountFactory'
import { newDbAuthenticator } from './../../usecases/authenticator/dbAuthenticatorFactory'
import { SignUpController } from '../../../../presentation/controller/signUp/signUpController'
import { newSignUpValidator } from './signupValidatorFactory'

export const newSignUpController = (): Controller => {
    const signUpController = new SignUpController(newDbAddAccount(), newSignUpValidator(), newDbAuthenticator())
    return newLogControllerDecorator(signUpController)
}
