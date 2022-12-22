import { newSignUpValidator } from './signUpValidatorFactory'
import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbAddAccount } from '@/main/factories/usecases/account/addAccount/dbAddAccountFactory'
import { newDbAuthenticator } from '@/main/factories/usecases/account/authenticator/dbAuthenticatorFactory'
import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controller/login/signUp/signUpController'

export const newSignUpController = (): Controller => {
    const signUpController = new SignUpController(newDbAddAccount(), newSignUpValidator(), newDbAuthenticator())
    return newLogControllerDecorator(signUpController)
}
