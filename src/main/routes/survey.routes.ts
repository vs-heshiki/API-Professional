import { adminAuth, auth } from './../middlewares/auth'
import { newLoadSurveysController } from './../factories/controllers/survey/loadSurveys/loadSurveysController'
import { ExpressRouterAdapter } from '../adapters/expressRouterAdapter'
import { Router } from 'express'
import { newAddSurveyController } from '../factories/controllers/survey/addSurvey/addSurveyControllerFactory'

export default (router: Router): void => {
    router.post('/survey', adminAuth, ExpressRouterAdapter(newAddSurveyController()))
    router.get('/survey', auth, ExpressRouterAdapter(newLoadSurveysController()))
}
