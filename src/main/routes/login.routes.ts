import { Router } from 'express'
import { ExpressRouterAdapter } from '@/main/adapters/expressRouterAdapter'
import { newSignUpController } from '@/main/factories/controllers/login/signUp/signUpControllerFactory'
import { newSignInController } from '@/main/factories/controllers/login/signIn/signInControllerFactory'

export default (router: Router): void => {
    router.post('/sign-up', ExpressRouterAdapter(newSignUpController()))
    router.post('/sign-in', ExpressRouterAdapter(newSignInController()))
}
