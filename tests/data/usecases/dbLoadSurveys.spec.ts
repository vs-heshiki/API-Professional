import { LoadSurveysRepository } from './../../../src/data/protocols/db/dbProtocols'
import { DbLoadSurveys } from '../../../src/data/usecases/loadSurveys/dbLoadSurveys'
import { SurveyModel } from './../../../src/domain/model/surveyModel'

const newFakeSurveys = (): SurveyModel[] => {
    return [{
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
    }]
}

const newLoadSurveysRepositoryStub = (): LoadSurveysRepository => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
        async loadAll (): Promise<SurveyModel[]> {
            return new Promise(resolve => resolve(newFakeSurveys()))
        }
    }
    return new LoadSurveysRepositoryStub()
}

interface SutTypes {
    sut: DbLoadSurveys
    loadSurveysRepositoryStub: LoadSurveysRepository
}
const newSut = (): SutTypes => {
    const loadSurveysRepositoryStub = newLoadSurveysRepositoryStub()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    return {
        sut,
        loadSurveysRepositoryStub
    }
}

describe('Database LoadSurveys UseCase', () => {
    test('Should call LoadSurveysRepository', async () => {
        const { sut, loadSurveysRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        await sut.load()
        expect(addSpyOn).toHaveBeenCalled()
    })

    test('Should return a list of surveys', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load()
        expect(httpResponse).toEqual(newFakeSurveys())
    })

    test('Should throw if LoadSurveysRepository throws', async () => {
        const { sut, loadSurveysRepositoryStub } = newSut()
        jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = sut.load()
        await expect(httpResponse).rejects.toThrow()
    })
})
