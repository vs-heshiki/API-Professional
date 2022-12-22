import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { LoadSurveysRepository, AddSurveyRepository } from '@/data/protocols/db/dbProtocols'
import { SurveyModel } from '@/domain/model/surveyModel'
import { CreateSurveyModel } from '@/domain/usecases/addSurveyModel'

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
