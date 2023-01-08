import { MongoHelper } from '../helper/mongoHelper'
import { UpdateAccessTokenRepository } from '@/data/protocols/cryptography/cryptographyProtocols'
import { LoadAccountByEmailRepository, LoadAccountByTokenRepository, AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db/account/dbAccountProtocols'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements
AddAccountRepository,
LoadAccountByEmailRepository,
UpdateAccessTokenRepository,
LoadAccountByTokenRepository,
CheckAccountByEmailRepository {
    async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Resolve> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.insertOne(accountData)
        return MongoHelper.map(accountData)
    }

    async loadByEmail (email: string, role?: string): Promise<LoadAccountByEmailRepository.Resolve> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email })
        return account && MongoHelper.map(account)
    }

    async checkByEmail (email: string, role?: string): Promise<CheckAccountByEmailRepository.Resolve> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({
            email
        }, {
            projection: {
                _id: 1
            }
        })
        return account !== null
    }

    async updateAccessToken (id: string, token: string): Promise<void> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                accessToken: token
            }
        })
    }

    async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Resolve> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({
            accessToken,
            $or: [{
                role
            }, {
                role: 'admin'
            }]
        }, {
            projection: {
                _id: 1
            }
        })
        return account && MongoHelper.map(account)
    }
}
