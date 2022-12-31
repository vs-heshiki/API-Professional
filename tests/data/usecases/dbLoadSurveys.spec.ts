import { DbLoadSurveys } from '@/data/usecases/survey/loadSurveys/dbLoadSurveys'
import { LoadSurveysRepository } from '@/data/usecases/survey/loadSurveys/dbLoadSurveysProtocols'
import { mockLoadSurveysRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurveys, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadSurveys
    loadSurveysRepositoryStub: LoadSurveysRepository
}
const newSut = (): SutTypes => {
    const loadSurveysRepositoryStub = mockLoadSurveysRepository()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    return {
        sut,
        loadSurveysRepositoryStub
    }
}

describe('Database LoadSurveys UseCase', () => {
    mockDate()

    test('Should call LoadSurveysRepository', async () => {
        const { sut, loadSurveysRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        await sut.load()
        expect(addSpyOn).toHaveBeenCalled()
    })

    test('Should return a list of surveys', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load()
        expect(httpResponse).toEqual(mockSurveys())
    })

    test('Should throw if LoadSurveysRepository throws', async () => {
        const { sut, loadSurveysRepositoryStub } = newSut()
        jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
        const httpResponse = sut.load()
        await expect(httpResponse).rejects.toThrow()
    })
})
