import { ExpressRouterAdapter } from '../adapters/express/expressRouterAdapter'
import { Router } from 'express'
import { newSignUpController } from '../factories/signup/signupFactory'

export default (router: Router): void => {
    router.post('/signUp', ExpressRouterAdapter(newSignUpController()))
}
