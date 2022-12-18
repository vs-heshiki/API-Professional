import { newLogControllerDecorator } from '../../../decorators/logControllerDecorator'
import { newDbAuthenticator } from '../../../usecases/account/authenticator/dbAuthenticatorFactory'
import { Controller } from '../../../../../presentation/protocols'
import { SignInController } from '../../../../../presentation/controller/login/signIn/signInControllerProtocols'
import { newSignInValidator } from './signInValidatorFactory'

export const newSignInController = (): Controller => {
    const signInController = new SignInController(newDbAuthenticator(), newSignInValidator())
    return newLogControllerDecorator(signInController)
}
