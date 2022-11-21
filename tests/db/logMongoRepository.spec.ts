import { LogMongoRepository } from '../../src/infra/db/mongodb/logRepository/logMongoRepository'
import { Collection } from 'mongodb'
import { MongoHelper } from '../../src/infra/db/mongodb/helper/mongoHelper'

const newSut = (): LogMongoRepository => {
    return new LogMongoRepository()
}
describe('Log Mongo Repository', () => {
    let errorCollection: Collection

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        errorCollection = await MongoHelper.getCollection('errors')
        await errorCollection.deleteMany({})
    })

    test('Should create a log error on success', async () => {
        const sut = newSut()
        await sut.logError('any_error')
        const count = await errorCollection.countDocuments()
        expect(count).toBe(1)
    })
})
