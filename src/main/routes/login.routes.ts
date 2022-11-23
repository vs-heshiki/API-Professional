import { ExpressRouterAdapter } from '../adapters/express/expressRouterAdapter'
import { Router } from 'express'
import { newSignUpController } from '../factories/signup/signupFactory'
import { newLoginController } from './../factories/login/loginFactory'

export default (router: Router): void => {
    router.post('/signUp', ExpressRouterAdapter(newSignUpController()))
    router.post('/login', ExpressRouterAdapter(newLoginController()))
}
