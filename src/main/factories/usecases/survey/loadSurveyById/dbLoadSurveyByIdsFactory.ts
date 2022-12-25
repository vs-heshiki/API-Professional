import { DbLoadSurveyById } from '@/data/usecases/survey/loadSurveyById/dbLoadSurveyById'
import { LoadSurveyById } from '@/domain/usecases/survey/loadSurveyById'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbLoadSurveyById = (): LoadSurveyById => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbLoadSurveyById(surveyMongoRepository)
}
