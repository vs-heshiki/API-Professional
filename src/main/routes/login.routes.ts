import { ExpressRouterAdapter } from '../adapters/expressRouterAdapter'
import { Router } from 'express'
import { newSignUpController } from '../factories/controllers/login/signUp/signUpControllerFactory'
import { newSignInController } from '../factories/controllers/login/signIn/signInControllerFactory'

export default (router: Router): void => {
    router.post('/sign-up', ExpressRouterAdapter(newSignUpController()))
    router.post('/sign-in', ExpressRouterAdapter(newSignInController()))
}
