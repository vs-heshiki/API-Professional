import { ExpressRouterAdapter } from '@/main/adapters/expressRouterAdapter'
import { newSaveSurveyResultController } from '@/main/factories/controllers/surveyResult/saveSurveyResult/saveSurveyResultControllerFactory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
    router.put('/survey/:surveyId/results', auth, ExpressRouterAdapter(newSaveSurveyResultController()))
}
