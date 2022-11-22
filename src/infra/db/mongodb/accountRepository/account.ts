import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/loadAccountByEmailRepository'
import { AddAccountRepository, AddAccountModel, AccountModel } from '../../../../data/usecases/addAccount/dbAddAccountProtocols'
import { MongoHelper } from '../helper/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.insertOne(accountData)
        return MongoHelper.map(accountData)
    }

    async loadAccByEmail (email: string): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email })
        return account && MongoHelper.map(account)
    }
}
