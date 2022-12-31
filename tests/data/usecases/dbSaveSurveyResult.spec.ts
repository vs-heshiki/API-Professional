import { DbSaveSurveyResult } from '@/data/usecases/survey/saveSurveyResult/dbSaveSurveyResult'
import { SaveSurveyResultRepository } from '@/data/usecases/survey/saveSurveyResult/dbSaveSurveyResultProtocols'
import { mockSaveSurveyResultRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurveyResult, mockSurveyResultData, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const newSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
    return {
        sut,
        saveSurveyResultRepositoryStub
    }
}

describe('Database SaveSurveyResult UseCase', () => {
    mockDate()

    test('Should call SaveSurveyResultRepository with correct Id', async () => {
        const { sut, saveSurveyResultRepositoryStub } = newSut()
        const saveSpyOn = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
        await sut.save(mockSurveyResultData())
        expect(saveSpyOn).toHaveBeenCalledWith(mockSurveyResultData())
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = newSut()
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
        const httpResponse = sut.save(mockSurveyResultData())
        await expect(httpResponse).rejects.toThrow()
    })

    test('Should return a Survey Result on success', async () => {
        const { sut } = newSut()
        const surveyResult = await sut.save(mockSurveyResultData())
        expect(surveyResult).toEqual(mockSurveyResult())
    })
})
