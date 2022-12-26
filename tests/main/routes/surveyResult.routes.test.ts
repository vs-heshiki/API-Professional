import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import app from '@/main/config/app'
import request from 'supertest'
import { Collection } from 'mongodb'
import { mockAccessToken } from '@/tests/mocks'

let surveyCollection: Collection

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await MongoHelper.disconnect()
})

beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
})

describe('Route PUT /survey/:surveyId/results', () => {
    test('Should return 403 on save survey results if no access token is provider', async () => {
        await request(app)
            .put('/api/survey/any_id/results')
            .send({
                answer: 'any_answer'
            })
            .expect(403)
    })

    test('Should return 200 on save survey results if access token is provider', async () => {
        const accessToken = await mockAccessToken()
        const res = await surveyCollection.insertOne({
            question: 'any_question',
            answers: [{
                answer: 'any_answer',
                image: 'any_image'
            }, {
                answer: 'other_answer'
            }],
            date: new Date()
        })
        await request(app)
            .put(`/api/survey/${res.insertedId.toHexString()}/results`)
            .set({ 'x-access-token': accessToken })
            .send({
                answer: 'any_answer'
            })
            .expect(200)
    })
})
