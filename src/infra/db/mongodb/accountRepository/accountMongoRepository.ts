import { MongoHelper } from '../helper/mongoHelper'
import { UpdateAccessTokenRepository } from '@/data/protocols/cryptography/cryptographyProtocols'
import { LoadAccountByEmailRepository, LoadAccountByTokenRepository, AddAccountRepository } from '@/data/protocols/db/account/dbAccountProtocols'
import { AddAccount } from '@/data/usecases/account/addAccount/dbAddAccountProtocols'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
    async add (accountData: AddAccount.Params): Promise<AddAccount.Model> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.insertOne(accountData)
        return MongoHelper.map(accountData)
    }

    async loadByEmail (email: string, role?: string): Promise<LoadAccountByEmailRepository.Model> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email })
        return account && MongoHelper.map(account)
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

    async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Model> {
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
