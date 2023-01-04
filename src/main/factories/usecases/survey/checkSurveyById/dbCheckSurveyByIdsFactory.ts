import { DbCheckSurveyById } from '@/data/usecases/survey/checkSurveyById/dbCheckSurveyById'
import { CheckSurveyById } from '@/domain/usecases/survey/checkSurveyById'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbCheckSurveyById = (): CheckSurveyById => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbCheckSurveyById(surveyMongoRepository)
}
