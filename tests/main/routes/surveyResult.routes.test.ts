import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import app from '@/main/config/app'
import request from 'supertest'

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await MongoHelper.disconnect()
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
})
