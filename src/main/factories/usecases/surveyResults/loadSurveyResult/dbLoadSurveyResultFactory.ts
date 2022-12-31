import { DbLoadSurveyResult } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResult'
import { LoadSurveyResult } from '@/domain/usecases/survey/loadSurveyResult'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResult/surveyResultMongoRepository'

export const newDbLoadSurveyResult = (): LoadSurveyResult => {
    const surveyResultsMongoRepository = new SurveyResultMongoRepository()
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbLoadSurveyResult(surveyResultsMongoRepository, surveyMongoRepository)
}
