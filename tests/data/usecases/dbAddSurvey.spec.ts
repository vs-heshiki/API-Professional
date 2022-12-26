import mockdate from 'mockdate'
import { DbAddSurvey } from '@/data/usecases/survey/addSurvey/dbAddSurvey'
import { AddSurveyParams, AddSurveyRepository } from '@/data/usecases/survey/addSurvey/dbAddSurveyProtocols'

const newFakeSurveyData = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }],
    date: new Date()
})

const newAddSurveyRepositoryStub = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
        async add (surveyData: AddSurveyParams): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new AddSurveyRepositoryStub()
}

type SutTypes = {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}
const newSut = (): SutTypes => {
    const addSurveyRepositoryStub = newAddSurveyRepositoryStub()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    return {
        sut,
        addSurveyRepositoryStub
    }
}

describe('Database AddSurvey UseCase', () => {
    beforeAll(() => {
        mockdate.set(new Date())
    })

    afterAll(() => {
        mockdate.reset()
    })
    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(addSurveyRepositoryStub, 'add')
        await sut.add(newFakeSurveyData())
        expect(addSpyOn).toHaveBeenCalledWith(newFakeSurveyData())
    })

    test('Should throw if AddSurveyRepository throws', async () => {
        const { sut, addSurveyRepositoryStub } = newSut()
        jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = sut.add(newFakeSurveyData())
        await expect(httpResponse).rejects.toThrow()
    })
})
