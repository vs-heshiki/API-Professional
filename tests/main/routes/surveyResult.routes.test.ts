import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import app from '@/main/config/app'
import env from '@/main/config/env'
import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

let accountCollection: Collection
let surveyCollection: Collection

const newAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
        name: 'Victor',
        email: 'victor.heshiki@gmail.com',
        password: '123'
    })
    const id = res.insertedId.toHexString()
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
        _id: res.insertedId
    }, {
        $set: {
            accessToken
        }
    })
    return accessToken
}

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await MongoHelper.disconnect()
})

beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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
        const accessToken = await newAccessToken()
        const res = await surveyCollection.insertOne({
            question: 'Question',
            answers: [{
                answer: 'Answer 1',
                image: 'any_image'
            }, {
                answer: 'Answer 2'
            }],
            date: new Date()
        })
        await request(app)
            .put(`/api/survey/${res.insertedId.toHexString()}/results`)
            .set({ 'x-access-token': accessToken })
            .send({
                answer: 'Answer 1'
            })
            .expect(200)
    })
})
