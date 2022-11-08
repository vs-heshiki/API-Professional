import { MongoClient } from 'mongodb'

export const mongoHelper = {
    client: null as MongoClient,

    async connect (url: string) {
        this.client = await MongoClient.connect(process.env.MONGO_URL)
    },

    async disconnect () {
        this.client.close()
    }
}
