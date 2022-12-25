import { DbAddSurvey } from '@/data/usecases/survey/addSurvey/dbAddSurvey'
import { AddSurvey } from '@/domain/usecases/survey/addSurvey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbAddSurvey = (): AddSurvey => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbAddSurvey(surveyMongoRepository)
}
