import { MongoHelper } from '../../../src/infra/db/mongodb/helper/mongoHelper'
import { AccountMongoRepository } from '../../../src/infra/db/mongodb/accountRepository/account'
import { Collection } from 'mongodb'

let getCollection: Collection

describe('Account MongoDB Adapter', () => {
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

    const newSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }

    test('Should return an account on add success', async () => {
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

    test('Should return an account on loadByEmail success', async () => {
        const sut = newSut()
        await getCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        const account = await sut.loadAccByEmail('any_email@email.com')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toEqual('any_name')
        expect(account.email).toEqual('any_email@email.com')
        expect(account.password).toEqual('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
        const sut = newSut()
        const account = await sut.loadAccByEmail('any_email@email.com')
        expect(account).toBeFalsy()
    })

    test('Should update an account adding access token', async () => {
        const sut = newSut()
        const res = await getCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        const fakeAccount = await getCollection.findOne({ _id: res.insertedId })
        expect(fakeAccount.accessToken).toBeFalsy()
        await sut.updateAccessToken(fakeAccount._id.toHexString(), 'any_token')
        const account = await getCollection.findOne({ _id: fakeAccount._id })
        expect(account).toBeTruthy()
        expect(account.accessToken).toBe('any_token')
    })
})
