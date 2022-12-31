import { DbSaveSurveyResult } from '@/data/usecases/survey/saveSurveyResult/dbSaveSurveyResult'
import { SaveSurveyResult } from '@/domain/usecases/survey/saveSurveyResult'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResult/surveyResultMongoRepository'

export const newDbSaveSurveyResult = (): SaveSurveyResult => {
    const surveyResultsMongoRepository = new SurveyResultMongoRepository()
    return new DbSaveSurveyResult(surveyResultsMongoRepository, surveyResultsMongoRepository)
}
