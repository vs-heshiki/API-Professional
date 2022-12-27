import { ExpressRouterAdapter } from '@/main/adapters/expressRouterAdapter'
import { newSignUpController } from '@/main/factories/controllers/login/signUp/signUpControllerFactory'
import { newSignInController } from '@/main/factories/controllers/login/signIn/signInControllerFactory'
import { Router } from 'express'

export default (router: Router): void => {
    router.post('/sign_up', ExpressRouterAdapter(newSignUpController()))
    router.post('/sign_in', ExpressRouterAdapter(newSignInController()))
}
