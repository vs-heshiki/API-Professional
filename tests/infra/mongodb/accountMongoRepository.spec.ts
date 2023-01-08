import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { AccountMongoRepository } from '@/infra/db/mongodb/accountRepository/accountMongoRepository'
import { Collection } from 'mongodb'
import { mockAddAccountData } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

let accountCollection: Collection

describe('Account MongoDB Repository', () => {
    const accountData = mockAddAccountData()

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    const newSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }

    describe('Add Method tests', () => {
        test('Should return an account on add success', async () => {
            const sut = newSut()
            const account = await sut.add(accountData)
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toEqual(accountData.name)
            expect(account.email).toEqual(accountData.email)
            expect(account.password).toEqual(accountData.password)
        })
    })

    describe('LoadAccByEmail Method tests', () => {
        test('Should return an account on loadByEmail success', async () => {
            const sut = newSut()
            await accountCollection.insertOne(accountData)
            const account = await sut.loadByEmail(accountData.email)
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toEqual(accountData.name)
            expect(account.email).toEqual(accountData.email)
            expect(account.password).toEqual(accountData.password)
        })

        test('Should return null if loadByEmail fails', async () => {
            const sut = newSut()
            const account = await sut.loadByEmail(accountData.email)
            expect(account).toBeFalsy()
        })
    })

    describe('CheckAccByEmail Method tests', () => {
        test('Should return an account on checkByEmail success', async () => {
            const sut = newSut()
            await accountCollection.insertOne(accountData)
            const check = await sut.checkByEmail(accountData.email)
            expect(check).toBeTruthy()
        })

        test('Should return null if checkByEmail fails', async () => {
            const sut = newSut()
            const check = await sut.loadByEmail(accountData.email)
            expect(check).toBeFalsy()
        })
    })

    describe('UpdateAccessToken Method tests', () => {
        test('Should update an account adding access token', async () => {
            const sut = newSut()
            const res = await accountCollection.insertOne(mockAddAccountData())
            const token = faker.datatype.uuid()
            const fakeAccount = await accountCollection.findOne({ _id: res.insertedId })
            expect(fakeAccount.accessToken).toBeFalsy()
            await sut.updateAccessToken(fakeAccount._id.toHexString(), token)
            const account = await accountCollection.findOne({ _id: fakeAccount._id })
            expect(account).toBeTruthy()
            expect(account.accessToken).toBe(token)
        })
    })

    describe('LoadAccByToken Method tests', () => {
        const accessToken = faker.datatype.uuid()

        test('Should return an account on LoadAccByToken without role', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                ...accountData,
                accessToken
            })
            const accountId = await sut.loadByToken(accessToken)
            expect(accountId).toBeTruthy()
        })

        test('Should return an account on LoadAccByToken with admin role', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                ...accountData,
                accessToken,
                role: 'admin'
            })
            const accountId = await sut.loadByToken(accessToken, 'admin')
            expect(accountId).toBeTruthy()
        })

        test('Should return an false on LoadAccByToken without role', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                ...accountData,
                accessToken
            })
            const account = await sut.loadByToken(accessToken, 'admin')
            expect(account).toBeFalsy()
        })

        test('Should return an account on LoadAccByToken with if user is admin', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                ...accountData,
                accessToken,
                role: 'admin'
            })
            const accountId = await sut.loadByToken(accessToken)
            expect(accountId).toBeTruthy()
        })

        test('Should return null if LoadAccByToken fails', async () => {
            const sut = newSut()
            const account = await sut.loadByToken(accessToken)
            expect(account).toBeFalsy()
        })
    })
})
