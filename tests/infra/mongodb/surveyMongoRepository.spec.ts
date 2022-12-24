import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

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
            await sut.add({
                question: 'any_question',
                answers: [{
                    image: 'any_image',
                    answer: 'any_answer'
                }, {
                    answer: 'other_answer'
                }],
                date: new Date()
            })
            const survey = await surveyCollection.findOne({ question: 'any_question' })
            expect(survey).toBeTruthy()
        })
    })

    describe('LoadAll Method tests', () => {
        test('Should load all surveys on success', async () => {
            await surveyCollection.insertMany([{
                id: 'any_id',
                question: 'any_question',
                answers: [{
                    image: 'any_image',
                    answer: 'any_answer'
                }],
                date: new Date()
            }, {
                id: 'another_id',
                question: 'another_question',
                answers: [{
                    image: 'another_image',
                    answer: 'another_answer'
                }],
                date: new Date()
            }])
            const sut = newSut()
            const surveys = await sut.loadAll()
            expect(surveys.length).toBe(2)
            expect(surveys).toBeInstanceOf(Array)
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
            const res = await surveyCollection.insertOne({
                question: 'any_question',
                answers: [{
                    image: 'any_image',
                    answer: 'any_answer'
                }],
                date: new Date()
            })
            const id = res.insertedId.toHexString()
            const sut = newSut()
            const survey = await sut.loadById(id)
            expect(survey).toBeTruthy()
        })
    })
})
