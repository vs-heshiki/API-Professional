import { ExpressRouterAdapter } from '../adapters/expressRouterAdapter'
import { Router } from 'express'
import { newAddSurveyController } from '../factories/controllers/survey/addSurvey/addSurveyControllerFactory'
import { ExpressMiddlewareAdapter } from '../adapters/expressMiddlewareAdapter'
import { newAuthMiddleware } from '../factories/middlewares/authMiddlewareFactory'

export default (router: Router): void => {
    const adminAuth = ExpressMiddlewareAdapter(newAuthMiddleware('admin'))
    router.post('/add-survey', adminAuth,ExpressRouterAdapter(newAddSurveyController()))
}
