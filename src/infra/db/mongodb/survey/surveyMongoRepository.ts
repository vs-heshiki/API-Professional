import { SurveyModel } from './../../../../domain/model/surveyModel'
import { LoadSurveysRepository } from './../../../../data/protocols/db/dbProtocols'
import { AddSurveyRepository } from '../../../../data/protocols/db/dbProtocols'
import { CreateSurveyModel } from '../../../../domain/usecases/addSurveyModel'
import { MongoHelper } from '../helper/mongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
    async add (surveyData: CreateSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
        await MongoHelper.map(surveyData)
    }

    async loadAll (): Promise<SurveyModel[]> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const surveys: any = await surveyCollection.find().toArray()
        return surveys
    }
}
