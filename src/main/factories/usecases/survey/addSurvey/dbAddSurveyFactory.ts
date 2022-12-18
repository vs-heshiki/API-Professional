import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/surveyMongoRepository'
import { DbAddSurvey } from '../../../../../data/usecases/addSurvey/dbAddSurvey'

export const newDbAddSurvey = (): DbAddSurvey => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbAddSurvey(surveyMongoRepository)
}
