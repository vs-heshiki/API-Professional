import { AddSurveyRepository } from '../../../../data/protocols/db/dbProtocols'
import { CreateSurveyModel } from '../../../../domain/usecases/addSurveyModel'
import { MongoHelper } from '../helper/mongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository {
    async add (surveyData: CreateSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
    }
}
