import { MongoHelper } from './../../infra/db/mongodb/helper/mongoHelper'
import request from 'supertest'
import app from '../../main/config/app'

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await MongoHelper.disconnect()
})

beforeEach(async () => {
    const getCollection = MongoHelper.getCollection('accounts')
    await getCollection.deleteMany({})
})

describe('SignUp Routes', () => {
    test('Should return an account on success', async () => {
        await request(app)
            .post('/api/signUp')
            .send({
                name: 'Victor',
                email: 'victor.heshiki@gmail.com',
                password: '123',
                confirmPassword: '123'
            })
            .expect(200)
    })
})
