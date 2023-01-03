import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { QueryBuilder } from '@/infra/db/mongodb/helper'
import { LoadSurveyRepository, AddSurveyRepository, LoadSurveyByIdRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveyRepository, LoadSurveyByIdRepository {
    async add (surveyData: AddSurveyRepository.Params): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
        await MongoHelper.map(surveyData)
    }

    async loadAll (accountId: string): Promise<LoadSurveyRepository.Model> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const query = new QueryBuilder()
            .lookup({
                from: 'surveyResults',
                localField: '_id',
                foreignField: 'surveyId',
                as: 'result'
            })
            .project({
                _id: 1,
                question: 1,
                answers: 1,
                date: 1,
                didAnswer: {
                    $gte: [{
                        $size: {
                            $filter: {
                                input: '$result',
                                as: 'item',
                                cond: ['$$item.accountId', new ObjectId(accountId)]
                            }
                        }
                    }, 1]
                }
            })
            .build()
        const surveys = await surveyCollection.aggregate(query).toArray()
        return MongoHelper.mapCollection(surveys)
    }

    async loadById (id: string): Promise<LoadSurveyByIdRepository.Model> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
        return survey && MongoHelper.map(survey)
    }
}
