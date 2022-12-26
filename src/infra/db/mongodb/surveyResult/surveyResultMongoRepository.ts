import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'
import { ObjectId } from 'mongodb'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        const result = await surveyResultCollection.findOneAndUpdate({
            surveyId: new ObjectId(data.surveyId),
            accountId: new ObjectId(data.accountId)
        }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
        }, {
            upsert: true
        })
        return result.value && MongoHelper.map(result.value)
    }
}
