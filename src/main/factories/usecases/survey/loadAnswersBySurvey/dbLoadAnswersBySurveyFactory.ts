import { DbLoadAnswersBySurvey } from '@/data/usecases/survey/loadAnswersBySurvey/dbLoadAnswersBySurvey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/loadAnswersBySurvey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const newDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
