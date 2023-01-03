import { DbLoadSurvey } from '@/data/usecases/survey/loadSurvey/dbLoadSurvey'
import { LoadSurveyRepository } from '@/data/usecases/survey/loadSurvey/dbLoadSurveyProtocols'
import { mockLoadSurveyRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurveys, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadSurvey
    loadSurveyRepositoryStub: LoadSurveyRepository
}
const newSut = (): SutTypes => {
    const loadSurveyRepositoryStub = mockLoadSurveyRepository()
    const sut = new DbLoadSurvey(loadSurveyRepositoryStub)
    return {
        sut,
        loadSurveyRepositoryStub
    }
}

describe('Database LoadSurvey UseCase', () => {
    mockDate()

    test('Should call LoadSurveyRepository with correct value', async () => {
        const { sut, loadSurveyRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(loadSurveyRepositoryStub, 'loadAll')
        const accountId = 'any_accountId'
        await sut.load(accountId)
        expect(addSpyOn).toHaveBeenCalled()
    })

    test('Should return a list of surveys', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load('any_accountId')
        expect(httpResponse).toEqual(mockSurveys())
    })

    test('Should throw if LoadSurveyRepository throws', async () => {
        const { sut, loadSurveyRepositoryStub } = newSut()
        jest.spyOn(loadSurveyRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
        const httpResponse = sut.load('any_accountId')
        await expect(httpResponse).rejects.toThrow()
    })
})
