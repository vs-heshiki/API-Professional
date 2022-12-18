import { Controller } from '../../../../../presentation/protocols'
import { newLogControllerDecorator } from '../../../decorators/logControllerDecorator'
import { AddSurveyController } from '../../../../../presentation/controller/survey/addSurveyController'
import { newAddSurveyValidator } from './addSurveyValidatorFactory'
import { newDbAddSurvey } from '../../../usecases/survey/addSurvey/dbAddSurveyFactory'

export const newAddSurveyController = (): Controller => {
    const addSurveyController = new AddSurveyController(newDbAddSurvey(), newAddSurveyValidator())
    return newLogControllerDecorator(addSurveyController)
}
