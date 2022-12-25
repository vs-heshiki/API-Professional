import { newLogControllerDecorator } from '@/main/factories/decorators/logControllerDecoratorFactory'
import { newDbLoadSurveyById } from '@/main/factories/usecases/survey/loadSurveyById/dbLoadSurveyByIdsFactory'
import { newDbSaveSurveyResults } from '@/main/factories/usecases/surveyResults/saveSurveyResult/dbSaveSurveyResultsFactory'
import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'
import { Controller } from '@/presentation/protocols'

export const newSaveSurveyResultController = (): Controller => {
    const controller = new SaveSurveyResultController(newDbLoadSurveyById() ,newDbSaveSurveyResults())
    return newLogControllerDecorator(controller)
}
