import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbLoadSurveyById } from '@/main/factories/usecases/survey/loadSurveyById/dbLoadSurveyByIdsFactory'
import { newDbLoadSurveyResult } from '@/main/factories/usecases/surveyResults/loadSurveyResult/dbLoadSurveyResultFactory'
import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { Controller } from '@/presentation/protocols'

export const newLoadSurveyResultController = (): Controller => {
    const loadSurveyResultController = new LoadSurveyResultController(newDbLoadSurveyById(), newDbLoadSurveyResult())
    return newLogControllerDecorator(loadSurveyResultController)
}
