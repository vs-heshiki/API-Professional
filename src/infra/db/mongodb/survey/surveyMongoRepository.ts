import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { LoadSurveysRepository, AddSurveyRepository, LoadSurveyByIdRepository } from '@/data/protocols/db/dbProtocols'
import { SurveyModel } from '@/domain/model/surveyModel'
import { AddSurveyModel } from '@/domain/usecases/addSurvey'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
        await MongoHelper.map(surveyData)
    }

    async loadAll (): Promise<SurveyModel[]> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const surveys: any = await surveyCollection.find().toArray()
        return MongoHelper.mapCollection(surveys)
    }

    async loadById (id: string): Promise<SurveyModel> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const survey: any = await surveyCollection.findOne({ _id: new ObjectId(id) })
        return survey && MongoHelper.map(survey)
    }
}
