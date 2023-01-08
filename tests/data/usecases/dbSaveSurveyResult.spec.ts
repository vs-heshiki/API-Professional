import { DbSaveSurveyResult } from '@/data/usecases/survey/saveSurveyResult/dbSaveSurveyResult'
import { LoadSurveyResultRepositorySpy, SaveSurveyResultRepositorySpy } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurveyResultData, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositorySpy: SaveSurveyResultRepositorySpy
    loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
}

const newSut = (): SutTypes => {
    const saveSurveyResultRepositorySpy = new SaveSurveyResultRepositorySpy()
    const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositorySpy, loadSurveyResultRepositorySpy)
    return {
        sut,
        saveSurveyResultRepositorySpy,
        loadSurveyResultRepositorySpy
    }
}

describe('Database SaveSurveyResult UseCase', () => {
    const surveyResult = mockSurveyResultData()

    mockDate()

    test('Should call SaveSurveyResultRepository with corrects datas', async () => {
        const { sut, saveSurveyResultRepositorySpy } = newSut()
        await sut.save(surveyResult)
        expect(saveSurveyResultRepositorySpy.data).toBe(surveyResult)
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositorySpy } = newSut()
        jest.spyOn(saveSurveyResultRepositorySpy, 'save').mockImplementationOnce(throwError)
        const surveySaved = sut.save(surveyResult)
        await expect(surveySaved).rejects.toThrow()
    })

    test('Should call LoadSurveyResultRepository with correct Id', async () => {
        const { sut, loadSurveyResultRepositorySpy } = newSut()
        await sut.save(surveyResult)
        expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyResult.surveyId)
        expect(loadSurveyResultRepositorySpy.accountId).toBe(surveyResult.accountId)
    })

    test('Should throw if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRepositorySpy } = newSut()
        jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementationOnce(throwError)
        const surveySaved = sut.save(mockSurveyResultData())
        await expect(surveySaved).rejects.toThrow()
    })

    test('Should return a Survey Result on success', async () => {
        const { sut, loadSurveyResultRepositorySpy } = newSut()
        const surveySaved = await sut.save(surveyResult)
        expect(surveySaved).toEqual(loadSurveyResultRepositorySpy.surveyResult)
    })
})
