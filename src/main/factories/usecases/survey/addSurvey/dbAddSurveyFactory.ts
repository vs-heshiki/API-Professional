import { DbAddSurvey } from '@/data/usecases/survey/addSurvey/dbAddSurvey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbAddSurvey = (): DbAddSurvey => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbAddSurvey(surveyMongoRepository)
}
