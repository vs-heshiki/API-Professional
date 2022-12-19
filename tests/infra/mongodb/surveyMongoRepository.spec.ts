import { MongoHelper } from '../../../src/infra/db/mongodb/helper/mongoHelper'
import { SurveyMongoRepository } from '../../../src/infra/db/mongodb/survey/surveyMongoRepository'
import { Collection } from 'mongodb'

let surveyCollection: Collection

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

    const newSut = (): SurveyMongoRepository => {
        return new SurveyMongoRepository()
    }

    test('Should add a survey on success', async () => {
        const sut = newSut()
        await sut.add({
            question: 'any_question',
            answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }, {
                answer: 'other_answer'
            }]
        })
        const survey = await surveyCollection.findOne({ question: 'any_question' })
        expect(survey).toBeTruthy()
    })
})