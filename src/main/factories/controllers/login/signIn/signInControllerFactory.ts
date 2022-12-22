import { newSignInValidator } from './signInValidatorFactory'
import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbAuthenticator } from '@/main/factories/usecases/account/authenticator/dbAuthenticatorFactory'
import { SignInController } from '@/presentation/controller/login/signIn/signInController'
import { Controller } from '@/presentation/protocols'

export const newSignInController = (): Controller => {
    const signInController = new SignInController(newDbAuthenticator(), newSignInValidator())
    return newLogControllerDecorator(signInController)
}
