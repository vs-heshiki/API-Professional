import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbLoadAnswersBySurvey } from '@/main/factories/usecases/survey/loadAnswersBySurvey/dbLoadAnswersBySurveyFactory'
import { newDbSaveSurveyResult } from '@/main/factories/usecases/surveyResults/saveSurveyResult/dbSaveSurveyResultFactory'
import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'
import { Controller } from '@/presentation/protocols'

export const newSaveSurveyResultController = (): Controller => {
    const controller = new SaveSurveyResultController(newDbLoadAnswersBySurvey(), newDbSaveSurveyResult())
    return newLogControllerDecorator(controller)
}
