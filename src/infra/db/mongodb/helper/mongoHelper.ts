import { MongoClient, Collection, ObjectId } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,

    async connect (uri: string): Promise<void> {
        this.uri = uri
        this.client = await MongoClient.connect(this.uri)
    },

    async disconnect (): Promise<void> {
        await this.client.close()
        this.client = null
    },

    async getCollection (name: string): Promise<Collection> {
        if (!this.client) {
            await this.connect(this.uri)
            return this.client.db().collection(name)
        }
        return this.client.db().collection(name)
    },

    map (data: any): any {
        const { _id, ...rest } = data
        return {
            ...rest,
            id: _id
        }
    },

    parseToObjectId (value: string): ObjectId {
        return new ObjectId(value)
    }
}
