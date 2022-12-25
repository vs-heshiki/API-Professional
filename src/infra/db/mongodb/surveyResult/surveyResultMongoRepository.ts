import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResultModel } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        const result = await surveyResultCollection.findOneAndUpdate({
            surveyId: data.surveyId,
            accountId: data.accountId
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
