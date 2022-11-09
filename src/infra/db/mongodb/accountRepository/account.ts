import { AddAccountRepository, AddAccountModel, AccountModel } from './../../../../data/usecases/addAccount/dbAddAccountProtocols'
import { MongoHelper } from '../helper/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = MongoHelper.getCollection('accounts')
        await accountCollection.insertOne(accountData)
        return MongoHelper.map(accountData)
    }
}
