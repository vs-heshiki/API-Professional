import { DbSaveSurveyResult } from '@/data/usecases/survey/saveSurveyResult/dbSaveSurveyResult'
import { SaveSurveyResult } from '@/domain/usecases/survey/saveSurveyResult'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResult/surveyResultMongoRepository'

export const newDbSaveSurveyResults = (): SaveSurveyResult => {
    const surveyResultsMongoRepository = new SurveyResultMongoRepository()
    return new DbSaveSurveyResult(surveyResultsMongoRepository)
}
