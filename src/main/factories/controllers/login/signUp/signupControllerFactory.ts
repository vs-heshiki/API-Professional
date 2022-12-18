import { newLogControllerDecorator } from '../../../decorators/logControllerDecorator'
import { Controller } from '../../../../../presentation/protocols'
import { newDbAddAccount } from '../../../usecases/account/addAccount/dbAddAccountFactory'
import { newDbAuthenticator } from '../../../usecases/account/authenticator/dbAuthenticatorFactory'
import { SignUpController } from '../../../../../presentation/controller/login/signUp/signUpController'
import { newSignUpValidator } from './signUpValidatorFactory'

export const newSignUpController = (): Controller => {
    const signUpController = new SignUpController(newDbAddAccount(), newSignUpValidator(), newDbAuthenticator())
    return newLogControllerDecorator(signUpController)
}
