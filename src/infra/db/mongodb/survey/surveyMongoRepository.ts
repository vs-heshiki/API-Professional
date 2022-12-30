import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { LoadSurveysRepository, AddSurveyRepository, LoadSurveyByIdRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { SurveyModel } from '@/domain/model/surveyModel'
import { AddSurveyParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
        await MongoHelper.map(surveyData)
    }

    async loadAll (): Promise<SurveyModel[]> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const surveys = await surveyCollection.find().toArray()
        return MongoHelper.mapCollection(surveys)
    }

    async loadById (id: string): Promise<SurveyModel> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
        return survey && MongoHelper.map(survey)
    }
}
