import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { QueryBuilder } from '@/infra/db/mongodb/helper'
import { LoadSurveyRepository, AddSurveyRepository, LoadSurveyByIdRepository, CheckSurveyByIdRepository, LoadAnswersBySurveyRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements
    AddSurveyRepository,
    LoadSurveyRepository,
    LoadSurveyByIdRepository,
    CheckSurveyByIdRepository,
    LoadAnswersBySurveyRepository {
    async add (surveyData: AddSurveyRepository.Params): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
        await MongoHelper.map(surveyData)
    }

    async loadAll (accountId: string): Promise<LoadSurveyRepository.Resolve> {
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

    async loadById (id: string): Promise<LoadSurveyByIdRepository.Resolve> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
        return survey && MongoHelper.map(survey)
    }

    async checkById (id: string): Promise<CheckSurveyByIdRepository.Resolve> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const survey = await surveyCollection.findOne({
            _id: new ObjectId(id)
        }, {
            projection: {
                _id: 1
            }
        })
        return survey !== null
    }

    async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Resolve> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        const query = new QueryBuilder()
            .match({
                _id: new ObjectId(id)
            })
            .project({
                _id: 0,
                answers: '$answers.answer'
            })
            .build()
        const surveys = await surveyCollection.aggregate(query).toArray()
        return surveys[0]?.answers || []
    }
}
