import { MongoHelper } from '../helper/mongoHelper'
import { LogErrorRepository } from '../../../../data/usecases/protocols/db/logErrorRepository'

export class LogMongoRepository implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
        const errorCollection = await MongoHelper.getCollection('errors')
        await errorCollection.insertOne({
            stack,
            date: new Date()
        })
    }
}
