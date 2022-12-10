import { ExpressRouterAdapter } from '../adapters/express/expressRouterAdapter'
import { Router } from 'express'
import { newSignUpController } from '../factories/controllers/signup/signupControllerFactory'
import { newLoginController } from '../factories/controllers/login/loginControllerFactory'

export default (router: Router): void => {
    router.post('/signUp', ExpressRouterAdapter(newSignUpController()))
    router.post('/login', ExpressRouterAdapter(newLoginController()))
}
