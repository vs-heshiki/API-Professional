import { DbLoadSurveys } from '@/data/usecases/loadSurveys/dbLoadSurveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbLoadSurveys = (): DbLoadSurveys => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbLoadSurveys(surveyMongoRepository)
}
