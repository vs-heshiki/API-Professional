import { MongoHelper } from '../../infra/db/mongodb/helper/mongoHelper'
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/account'

describe('Account MongoDB Adapter', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        const getCollection = await MongoHelper.getCollection('accounts')
        await getCollection.deleteMany({})
    })

    const newSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }

    test('Should return an account on success', async () => {
        const sut = newSut()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toEqual('any_name')
        expect(account.email).toEqual('any_email@email.com')
        expect(account.password).toEqual('any_password')
    })
})
