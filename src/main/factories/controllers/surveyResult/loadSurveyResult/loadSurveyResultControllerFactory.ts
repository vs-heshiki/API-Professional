import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbCheckSurveyById } from '@/main/factories/usecases/survey/checkSurveyById/dbCheckSurveyByIdsFactory'
import { newDbLoadSurveyResult } from '@/main/factories/usecases/surveyResults/loadSurveyResult/dbLoadSurveyResultFactory'
import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { Controller } from '@/presentation/protocols'

export const newLoadSurveyResultController = (): Controller => {
    const controller = new LoadSurveyResultController(newDbCheckSurveyById(), newDbLoadSurveyResult())
    return newLogControllerDecorator(controller)
}
