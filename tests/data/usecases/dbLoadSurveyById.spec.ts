import { DbLoadSurveyById } from '@/data/usecases/survey/loadSurveyById/dbLoadSurveyById'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/loadSurveyById/dbLoadSurveyByIdProtocols'
import { mockLoadSurveyByIdRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurvey, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadSurveyById
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const newSut = (): SutTypes => {
    const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
    const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
    return {
        sut,
        loadSurveyByIdRepositoryStub
    }
}

describe('Database LoadSurveys UseCase', () => {
    mockDate()

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
        expect(httpResponse).toEqual(mockSurvey())
    })

    test('Should throw if LoadSurveyByIdRepository throws', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = newSut()
        jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
        const httpResponse = sut.loadById('any_id')
        await expect(httpResponse).rejects.toThrow()
    })
})
