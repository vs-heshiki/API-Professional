import { ExpressRouterAdapter } from '@/main/adapters/expressRouterAdapter'
import { newLoadSurveyController } from '@/main/factories/controllers/survey/loadSurvey/loadSurveyControllerFactory'
import { newAddSurveyController } from '@/main/factories/controllers/survey/addSurvey/addSurveyControllerFactory'
import { adminAuth, auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
    router.post('/survey', adminAuth, ExpressRouterAdapter(newAddSurveyController()))
    router.get('/survey', auth, ExpressRouterAdapter(newLoadSurveyController()))
}
