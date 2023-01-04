import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'
import { mockSurveyData, mockSurveys, mockAddAccountData } from '@/tests/mocks'
import { AccountModel } from '@/domain/model/accountModel'
import { faker } from '@faker-js/faker'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const mockAccount = async (): Promise<AccountModel> => {
    const res = await accountCollection.insertOne(mockAddAccountData())
    const account = await accountCollection.findOne({ _id: res.insertedId })
    return MongoHelper.map(account)
}

const newSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
}

describe('Survey MongoDB Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})

        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})

        surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        await surveyResultCollection.deleteMany({})
    })

    describe('Add Method tests', () => {
        test('Should add a survey on success', async () => {
            const sut = newSut()
            await sut.add(mockSurveyData())
            const survey = await surveyCollection.findOne({ question: 'any_question' })
            expect(survey).toBeTruthy()
        })
    })

    describe('LoadAll Method tests', () => {
        test('Should load all surveys on success', async () => {
            const account = await mockAccount()
            const res = await surveyCollection.insertMany(mockSurveys())
            const survey = await surveyCollection.findOne({
                _id: res.insertedIds[0]
            })
            await surveyResultCollection.insertOne({
                surveyId: new ObjectId(survey._id),
                accountId: new ObjectId(account.id),
                answer: survey.answers[0],
                date: new Date()
            })
            const sut = newSut()
            const surveys = await sut.loadAll(account.id)
            expect(surveys.length).toBe(2)
            expect(surveys).toBeInstanceOf(Array)
            expect(surveys[0].id).toBeTruthy()
            expect(surveys[0].question).toBe('any_question')
            expect(surveys[0].didAnswer).toBeTruthy()
            expect(surveys[1].id).toBeTruthy()
            expect(surveys[1].question).toBe('another_question')
            expect(surveys[1].didAnswer).toBeFalsy()
        })

        test('Should load empty list', async () => {
            const account = await mockAccount()
            const sut = newSut()
            const surveys = await sut.loadAll(account.id)
            expect(surveys.length).toBe(0)
        })
    })

    describe('LoadById Method tests', () => {
        test('Should load survey answers on success', async () => {
            const res = await surveyCollection.insertOne(mockSurveyData())
            const id = res.insertedId.toHexString()
            const sut = newSut()
            const survey = await sut.loadById(id)
            expect(survey).toBeTruthy()
            expect(survey.answers).toBeTruthy()
        })
    })

    describe('CheckById Method tests', () => {
        test('Should return true if survey exists', async () => {
            const res = await surveyCollection.insertOne(mockSurveyData())
            const id = res.insertedId.toHexString()
            const sut = newSut()
            const exists = await sut.checkById(id)
            expect(exists).toBeTruthy()
        })

        test('Should return false if survey not exists', async () => {
            const sut = newSut()
            const exists = await sut.checkById(faker.database.mongodbObjectId())
            expect(exists).toBeFalsy()
        })
    })
})
