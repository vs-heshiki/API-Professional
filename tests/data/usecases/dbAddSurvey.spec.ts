import { DbAddSurvey } from '@/data/usecases/survey/addSurvey/dbAddSurvey'
import { AddSurveyRepository } from '@/data/usecases/survey/addSurvey/dbAddSurveyProtocols'
import { mockAddSurveyRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurveyData, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}
const newSut = (): SutTypes => {
    const addSurveyRepositoryStub = mockAddSurveyRepository()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    return {
        sut,
        addSurveyRepositoryStub
    }
}

describe('Database AddSurvey UseCase', () => {
    mockDate()

    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = newSut()
        const addSpyOn = jest.spyOn(addSurveyRepositoryStub, 'add')
        await sut.add(mockSurveyData())
        expect(addSpyOn).toHaveBeenCalledWith(mockSurveyData())
    })

    test('Should throw if AddSurveyRepository throws', async () => {
        const { sut, addSurveyRepositoryStub } = newSut()
        jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
        const httpResponse = sut.add(mockSurveyData())
        await expect(httpResponse).rejects.toThrow()
    })
})
