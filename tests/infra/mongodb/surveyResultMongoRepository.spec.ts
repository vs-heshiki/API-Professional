import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResult/surveyResultMongoRepository'
import { AccountModel } from '@/domain/model/accountModel'
import { SurveyModel } from '@/domain/model/surveyModel'
import { mockAddAccountData, mockSurveyData } from '@/tests/mocks'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const newSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
}

const mockAccount = async (): Promise<AccountModel> => {
    const res = await accountCollection.insertOne(mockAddAccountData())
    const account = await accountCollection.findOne({ _id: res.insertedId })
    return MongoHelper.map(account)
}

const mockSurvey = async (): Promise<SurveyModel> => {
    const res = await surveyCollection.insertOne(mockSurveyData())
    const survey = await surveyCollection.findOne({ _id: res.insertedId })
    return MongoHelper.map(survey)
}

describe('Survey Result MongoDB Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})

        surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        await surveyResultCollection.deleteMany({})

        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    describe('Save Method tests', () => {
        test('Should save a result survey if its new', async () => {
            const account = await mockAccount()
            const survey = await mockSurvey()
            const sut = newSut()
            const surveyResult = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answer,
                date: new Date()
            })
            expect(surveyResult).toBeTruthy()
            expect(surveyResult.surveyId).toEqual(survey.id)
            expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
            expect(surveyResult.answers[0].count).toBe(1)
            expect(surveyResult.answers[0].percent).toBe(100)
            expect(surveyResult.answers[1].count).toBe(0)
            expect(surveyResult.answers[1].percent).toBe(0)
        })

        test('Should update a result survey if already exists', async () => {
            const account = await mockAccount()
            const survey = await mockSurvey()
            await surveyResultCollection.insertOne({
                surveyId: new ObjectId(survey.id),
                accountId: new ObjectId(account.id),
                answer: survey.answers[0].answer,
                date: new Date()
            })
            const sut = newSut()
            const surveyResult = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[1].answer,
                date: new Date()
            })
            expect(surveyResult).toBeTruthy()
            expect(surveyResult.surveyId).toEqual(survey.id)
            expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
            expect(surveyResult.answers[0].count).toBe(1)
            expect(surveyResult.answers[0].percent).toBe(100)
            expect(surveyResult.answers[1].count).toBe(0)
            expect(surveyResult.answers[1].percent).toBe(0)
        })
    })
})
