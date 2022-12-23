import { LoadSurveyByIdRepository } from '@/data/protocols/db/loadSurveyByIdRepository'
import { DbLoadSurveyById } from '@/data/usecases/loadSurveyById/dbLoadSurveyById'
import { SurveyModel } from '@/domain/model/surveyModel'
import mockdate from 'mockdate'

const newFakeSurvey = (): SurveyModel => {
    return {
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}

const newLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById (id: string): Promise<SurveyModel> {
            return new Promise(resolve => resolve(newFakeSurvey()))
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
    sut: DbLoadSurveyById
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const newSut = (): SutTypes => {
    const loadSurveyByIdRepositoryStub = newLoadSurveyByIdRepository()
    const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
    return {
        sut,
        loadSurveyByIdRepositoryStub
    }
}

describe('Database LoadSurveys UseCase', () => {
    beforeAll(() => {
        mockdate.set(new Date())
    })

    afterAll(() => {
        mockdate.reset()
    })

    test('Should call LoadSurveyByIdRepository with correct Id', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
        await sut.loadById('any_id')
        expect(loadSpyOn).toHaveBeenCalledWith('any_id')
    })

    test('Should return a survey with matching id', async () => {
        const id = 'any_id'
        const { sut } = newSut()
        const httpResponse = await sut.loadById(id)
        expect(httpResponse).toEqual(newFakeSurvey())
    })
})
