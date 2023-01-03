import { DbLoadSurvey } from '@/data/usecases/survey/loadSurvey/dbLoadSurvey'
import { LoadSurvey } from '@/domain/usecases/survey/loadSurvey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbLoadSurvey = (): LoadSurvey => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbLoadSurvey(surveyMongoRepository)
}
