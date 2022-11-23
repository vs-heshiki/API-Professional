import { MongoHelper } from '../../src/infra/db/mongodb/helper/mongoHelper'
import { Collection } from 'mongodb'
import bcrypt from 'bcrypt'
import request from 'supertest'
import app from '../../src/main/config/app'

const genSalt = async (): Promise<string> => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return salt
}

let getCollection: Collection

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await MongoHelper.disconnect()
})

beforeEach(async () => {
    getCollection = await MongoHelper.getCollection('accounts')
    await getCollection.deleteMany({})
})

describe('SignUp/In/Out Routes', () => {
    describe('SignUp Route', () => {
        test('Should return 200 on signup', async () => {
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

    describe('Login Route', () => {
        test('Should return 200 on login', async () => {
            const password = await bcrypt.hash('123', await genSalt())
            await getCollection.insertOne({
                name: 'Victor',
                email: 'victor.heshiki@gmail.com',
                password
            })
            await request(app)
                .post('/api/login')
                .send({
                    email: 'victor.heshiki@gmail.com',
                    password: '123'
                })
                .expect(200)
        })

        test('Should return 200 on login', async () => {
            await request(app)
                .post('/api/login')
                .send({
                    email: 'victor.heshiki@gmail.com',
                    password: '123'
                })
                .expect(401)
        })
    })
})
