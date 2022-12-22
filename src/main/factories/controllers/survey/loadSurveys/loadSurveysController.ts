import { newDbLoadSurveys } from '@/main/factories/usecases/survey/loadSurveys/dbLoadSurveysFactory'
import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { LoadSurveysController } from '@/presentation/controller/survey/loadSurvey/loadSurveysController'
import { Controller } from '@/presentation/protocols'

export const newLoadSurveysController = (): Controller => {
    const newLoadSurveysController = new LoadSurveysController(newDbLoadSurveys())
    return newLogControllerDecorator(newLoadSurveysController)
}
