import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbLoadSurveyById } from '@/main/factories/usecases/survey/loadSurveyById/dbLoadSurveyByIdsFactory'
import { newDbSaveSurveyResult } from '@/main/factories/usecases/surveyResults/saveSurveyResult/dbSaveSurveyResultFactory'
import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'
import { Controller } from '@/presentation/protocols'

export const newSaveSurveyResultController = (): Controller => {
    const saveSurveyResultController = new SaveSurveyResultController(newDbLoadSurveyById(), newDbSaveSurveyResult())
    return newLogControllerDecorator(saveSurveyResultController)
}
