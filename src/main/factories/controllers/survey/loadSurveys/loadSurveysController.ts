import { newDbLoadSurveys } from './../../../usecases/survey/loadSurveys/dbLoadSurveysFactory'
import { LoadSurveysController } from './../../../../../presentation/controller/survey/loadSurvey/loadSurveysController'
import { Controller } from '../../../../../presentation/protocols'
import { newLogControllerDecorator } from '../../../decorators/logControllerDecorator'

export const newLoadSurveysController = (): Controller => {
    const newLoadSurveysController = new LoadSurveysController(newDbLoadSurveys())
    return newLogControllerDecorator(newLoadSurveysController)
}
