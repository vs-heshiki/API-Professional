import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { sign } from 'jsonwebtoken'
import mockdate from 'mockdate'
import { faker } from '@faker-js/faker'

export const throwError = (): never => { throw new Error() }

export const mockAccessToken = async (): Promise<string> => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const res = await accountCollection.insertOne({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'admin'
    })
    const id = res.insertedId.toHexString()
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
        _id: res.insertedId
    }, {
        $set: {
            accessToken
        }
    })
    return accessToken
}

export const mockDate = (): void => {
    beforeAll(() => {
        mockdate.set(new Date())
    })

    afterAll(() => {
        mockdate.reset()
    })
}
