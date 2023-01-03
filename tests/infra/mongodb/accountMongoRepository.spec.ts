import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { AccountMongoRepository } from '@/infra/db/mongodb/accountRepository/accountMongoRepository'
import { Collection } from 'mongodb'
import { mockAddAccountData } from '@/tests/mocks'

let accountCollection: Collection

describe('Account MongoDB Repository', () => {
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
            const account = await sut.add(mockAddAccountData())
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toEqual('any_name')
            expect(account.email).toEqual('any_mail@email.com')
            expect(account.password).toEqual('any_password')
        })
    })

    describe('LoadAccByEmail Method tests', () => {
        test('Should return an account on loadByEmail success', async () => {
            const sut = newSut()
            await accountCollection.insertOne(mockAddAccountData())
            const account = await sut.loadByEmail('any_mail@email.com')
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toEqual('any_name')
            expect(account.email).toEqual('any_mail@email.com')
            expect(account.password).toEqual('any_password')
        })

        test('Should return null if loadByEmail fails', async () => {
            const sut = newSut()
            const account = await sut.loadByEmail('any_mail@email.com')
            expect(account).toBeFalsy()
        })
    })

    describe('UpdateAccessToken Method tests', () => {
        test('Should update an account adding access token', async () => {
            const sut = newSut()
            const res = await accountCollection.insertOne(mockAddAccountData())
            const fakeAccount = await accountCollection.findOne({ _id: res.insertedId })
            expect(fakeAccount.accessToken).toBeFalsy()
            await sut.updateAccessToken(fakeAccount._id.toHexString(), 'any_token')
            const account = await accountCollection.findOne({ _id: fakeAccount._id })
            expect(account).toBeTruthy()
            expect(account.accessToken).toBe('any_token')
        })
    })

    describe('LoadAccByToken Method tests', () => {
        test('Should return an account on LoadAccByToken without role', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_mail@email.com',
                password: 'any_password',
                accessToken: 'any_token'
            })
            const accountId = await sut.loadByToken('any_token')
            expect(accountId).toBeTruthy()
        })

        test('Should return an account on LoadAccByToken with admin role', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_mail@email.com',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin'
            })
            const accountId = await sut.loadByToken('any_token', 'admin')
            expect(accountId).toBeTruthy()
        })

        test('Should return an false on LoadAccByToken without role', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_mail@email.com',
                password: 'any_password',
                accessToken: 'any_token'
            })
            const account = await sut.loadByToken('any_token', 'admin')
            expect(account).toBeFalsy()
        })

        test('Should return an account on LoadAccByToken with if user is admin', async () => {
            const sut = newSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_mail@email.com',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin'
            })
            const accountId = await sut.loadByToken('any_token')
            expect(accountId).toBeTruthy()
        })

        test('Should return null if LoadAccByToken fails', async () => {
            const sut = newSut()
            const account = await sut.loadByToken('any_token')
            expect(account).toBeFalsy()
        })
    })
})
