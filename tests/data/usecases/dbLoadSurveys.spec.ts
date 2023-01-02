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

    test('Should call LoadSurveysRepository with correct value', async () => {
        const { sut, loadSurveysRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        const accountId = 'any_accountId'
        await sut.load(accountId)
        expect(addSpyOn).toHaveBeenCalled()
    })

    test('Should return a list of surveys', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load('any_accountId')
        expect(httpResponse).toEqual(mockSurveys())
    })

    test('Should throw if LoadSurveysRepository throws', async () => {
        const { sut, loadSurveysRepositoryStub } = newSut()
        jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
        const httpResponse = sut.load('any_accountId')
        await expect(httpResponse).rejects.toThrow()
    })
})
