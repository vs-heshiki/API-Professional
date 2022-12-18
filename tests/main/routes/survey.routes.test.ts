import { MongoHelper } from '../../../src/infra/db/mongodb/helper/mongoHelper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../../../src/main/config/app'

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
describe('AddSurvey Route', () => {
    test('Should return 403 if no access token is provider', async () => {
        await request(app)
            .post('/api/add-survey')
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
})
