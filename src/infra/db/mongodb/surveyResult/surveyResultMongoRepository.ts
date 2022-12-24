import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SaveSurveyResultRepository } from '@/data/protocols/db/dbProtocols'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResultModel } from '@/domain/usecases/saveSurveyResult'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const resultsCollection = await MongoHelper.getCollection('surveyResults')
        const result = await resultsCollection.findOneAndUpdate({
            surveyId: data.surveyId,
            accountId: data.userId
        }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
        }, {
            upsert: true,
            returnDocument: 'after'
        })
        return result.value && MongoHelper.map(result.value)
    }
}
