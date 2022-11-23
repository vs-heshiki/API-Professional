import { MongoClient, Collection, ObjectId } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    url: null as string,

    async connect (url: string): Promise<void> {
        this.url = url
        this.client = await MongoClient.connect(this.url)
    },

    async disconnect (): Promise<void> {
        await this.client?.close()
        this.client = null
    },

    async getCollection (name: string): Promise<Collection> {
        if (!this.client) {
            await this.connect(this.url)
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
