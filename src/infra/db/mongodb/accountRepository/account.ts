import { AddAccountRepository, AddAccountModel, AccountModel } from './../../../../data/usecases/addAccount/dbAddAccountProtocols'
import { MongoHelper } from '../helper/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = MongoHelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        const account = { id: result.insertedId.toString(), ...accountData }
        return account
    }
}
