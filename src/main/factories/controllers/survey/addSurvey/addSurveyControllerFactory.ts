import { newAddSurveyValidator } from './addSurveyValidatorFactory'
import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbAddSurvey } from '@/main/factories/usecases/survey/addSurvey/dbAddSurveyFactory'
import { AddSurveyController } from '@/presentation/controller/survey/addSurvey/addSurveyController'
import { Controller } from '@/presentation/protocols'

export const newAddSurveyController = (): Controller => {
    const controller = new AddSurveyController(newDbAddSurvey(), newAddSurveyValidator())
    return newLogControllerDecorator(controller)
}
