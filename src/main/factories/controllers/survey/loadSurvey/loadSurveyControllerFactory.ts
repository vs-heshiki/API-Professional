import { newDbLoadSurvey } from '@/main/factories/usecases/survey/loadSurvey/dbloadSurveyFactory'
import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { LoadSurveyController } from '@/presentation/controller/survey/loadSurvey/loadSurveyController'
import { Controller } from '@/presentation/protocols'

export const newLoadSurveyController = (): Controller => {
    const controller = new LoadSurveyController(newDbLoadSurvey())
    return newLogControllerDecorator(controller)
}
