import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongoHelper'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResult/surveyResultMongoRepository'
import { AccountModel } from '@/domain/model/accountModel'
import { SurveyModel } from '@/domain/model/surveyModel'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const newSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
}

const mockAccount = async (): Promise<AccountModel> => {
    const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
    })
    const account = await accountCollection.findOne({ _id: res.insertedId })
    return MongoHelper.map(account)
}

const mockSurvey = async (): Promise<SurveyModel> => {
    const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }, {
            image: 'any_other_image',
            answer: 'any_other_answer'
        }],
        date: new Date()
    })
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
                userId: account.id,
                answer: survey.answers[0].answer,
                date: new Date()
            })
            expect(surveyResult).toBeTruthy()
            expect(surveyResult.id).toBeTruthy()
            expect(surveyResult.answer).toBe(survey.answers[0].answer)
        })
    })
})
