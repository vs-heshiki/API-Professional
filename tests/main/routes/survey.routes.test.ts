import { MongoHelper } from '../../../src/infra/db/mongodb/helper/mongoHelper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import app from '../../../src/main/config/app'
import env from '../../../src/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

const newAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
        name: 'Victor',
        email: 'victor.heshiki@gmail.com',
        password: '123',
        role: 'admin'
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
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
})
describe('Route POST /survey', () => {
    test('Should return 403 if no access token is provider', async () => {
        await request(app)
            .post('/api/survey')
            .send({
                question: 'any_question',
                answers: [{
                    image: 'any_image',
                    anwser: 'any_anwser'
                }, {
                    anwser: 'other_anwser'
                }]
            })
            .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
        const accessToken = await newAccessToken()
        await request(app)
            .post('/api/survey')
            .set({ 'x-access-token': accessToken })
            .send({
                question: 'Question',
                answers: [{
                    answer: 'Answer 1',
                    image: 'http://image-name.com'
                }, {
                    answer: 'Answer 2'
                }]
            })
            .expect(204)
    })
})

describe('Route GET /surveys', () => {
    test('Should return 403 if no access token is provider', async () => {
        await request(app)
            .get('/api/survey')
            .expect(403)
    })
})
