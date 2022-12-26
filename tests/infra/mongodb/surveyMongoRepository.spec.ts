import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'
import { mockSurveyData, mockSurveys } from '@/tests/mocks'

let surveyCollection: Collection

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
            await surveyCollection.insertMany(mockSurveys())
            const sut = newSut()
            const surveys = await sut.loadAll()
            expect(surveys.length).toBe(2)
            expect(surveys).toBeInstanceOf(Array)
            expect(surveys[0].id).toBeTruthy()
            expect(surveys[0].question).toBe('any_question')
        })

        test('Should load empty list', async () => {
            const sut = newSut()
            const surveys = await sut.loadAll()
            expect(surveys.length).toBe(0)
        })
    })

    describe('LoadById Method tests', () => {
        test('Should load survey on success', async () => {
            const res = await surveyCollection.insertOne(mockSurveyData())
            const id = res.insertedId.toHexString()
            const sut = newSut()
            const survey = await sut.loadById(id)
            expect(survey).toBeTruthy()
            expect(survey.id).toBeTruthy()
        })
    })
})
