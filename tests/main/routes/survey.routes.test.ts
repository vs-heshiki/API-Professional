import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { mockAccessToken, mockSurveyRequest } from '@/tests/mocks'
import { Collection } from 'mongodb'
import request from 'supertest'

let surveyCollection: Collection
let accountCollection: Collection

const { body } = mockSurveyRequest()

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await MongoHelper.disconnect()
})

beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
})

describe('Survey Routes', () => {
    describe('Route POST /survey', () => {
        test('Should return 403 if no access token is provider', async () => {
            await request(app)
                .post('/api/survey')
                .send(body)
                .expect(403)
        })

        test('Should return 204 on add survey with valid accessToken', async () => {
            const accessToken = await mockAccessToken()
            await request(app)
                .post('/api/survey')
                .set({ 'x-access-token': accessToken })
                .send(body)
                .expect(204)
        })
    })

    describe('Route GET /surveys', () => {
        test('Should return 403 if no access token is provider', async () => {
            await request(app)
                .get('/api/survey')
                .expect(403)
        })

        test('Should return 204 on load surveys with valid accessToken', async () => {
            const accessToken = await mockAccessToken()
            await request(app)
                .get('/api/survey')
                .set({ 'x-access-token': accessToken })
                .expect(204)
        })
    })
})
