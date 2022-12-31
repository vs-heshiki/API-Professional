import { DbSaveSurveyResult } from '@/data/usecases/survey/saveSurveyResult/dbSaveSurveyResult'
import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/usecases/survey/saveSurveyResult/dbSaveSurveyResultProtocols'
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurveyResult, mockSurveyResultData, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const newSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)
    return {
        sut,
        saveSurveyResultRepositoryStub,
        loadSurveyResultRepositoryStub
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

    test('Should call LoadSurveyResultRepository with correct Id', async () => {
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        const surveyResult = mockSurveyResultData()
        await sut.save(surveyResult)
        expect(loadSpyOn).toHaveBeenCalledWith(surveyResult.surveyId)
    })

    test('Should return a Survey Result on success', async () => {
        const { sut } = newSut()
        const surveyResult = await sut.save(mockSurveyResultData())
        expect(surveyResult).toEqual(mockSurveyResult())
    })

    test('Should throw if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
        const httpResponse = sut.save(mockSurveyResultData())
        await expect(httpResponse).rejects.toThrow()
    })
})
