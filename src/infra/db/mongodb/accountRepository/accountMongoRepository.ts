import { UpdateAccessTokenRepository } from '../../../../data/protocols/cryptography/cryptographyProtocols'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/dbProtocols'
import { AddAccountRepository, AddAccountModel, AccountModel } from '../../../../data/usecases/addAccount'
import { MongoHelper } from '../helper/mongoHelper'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/loadAccountByTokenRepository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.insertOne(accountData)
        return MongoHelper.map(accountData)
    }

    async loadByEmail (email: string, role?: string): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email })
        return account && MongoHelper.map(account)
    }

    async updateAccessToken (id: string, token: string): Promise<void> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const objectId = MongoHelper.parseToObjectId(id)
        await accountCollection.updateOne({
            _id: objectId
        }, {
            $set: {
                accessToken: token
            }
        })
    }

    async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({
            accessToken,
            $or: [{
                role
            }, {
                role: 'admin'
            }]
        })
        return account && MongoHelper.map(account)
    }
}
