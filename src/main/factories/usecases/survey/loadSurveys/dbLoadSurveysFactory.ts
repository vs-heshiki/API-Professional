import { DbLoadSurveys } from '@/data/usecases/survey/loadSurveys/dbLoadSurveys'
import { LoadSurveys } from '@/domain/usecases/survey/loadSurveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbLoadSurveys = (): LoadSurveys => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbLoadSurveys(surveyMongoRepository)
}
