import { DbLoadSurveyResult } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResult'
import { LoadSurveyByIdRepositorySpy, LoadSurveyResultRepositorySpy } from '@/tests/data/usecases/spy/dbSurveySpy'
import { mockAccount, mockDate, mockSurveyResult, mockSurveyResultEmpty, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadSurveyResult
    loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
    loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const newSut = (): SutTypes => {
    const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
    const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy)
    return {
        sut,
        loadSurveyResultRepositorySpy,
        loadSurveyByIdRepositorySpy
    }
}

describe('Database LoadSurveyResult UseCase', () => {
    const survey = mockSurveyResult()
    const account = mockAccount()

    mockDate()

    test('Should call LoadSurveyResultRepository with correct values', async () => {
        const { sut, loadSurveyResultRepositorySpy } = newSut()
        await sut.load(survey.surveyId, account.id)
        expect(loadSurveyResultRepositorySpy.accountId).toBe(account.id)
        expect(loadSurveyResultRepositorySpy.surveyId).toBe(survey.surveyId)
    })

    test('Should throw if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRepositorySpy } = newSut()
        jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementationOnce(throwError)
        const surveyResult = sut.load(survey.surveyId, account.id)
        await expect(surveyResult).rejects.toThrow()
    })

    test('Should return a SurveyResultModel on success', async () => {
        const { sut, loadSurveyResultRepositorySpy } = newSut()
        const surveyResult = await sut.load(survey.surveyId, account.id)
        expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResult)
    })

    test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
        const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = newSut()
        loadSurveyResultRepositorySpy.surveyResult = null
        await sut.load(survey.surveyId, account.id)
        expect(loadSurveyByIdRepositorySpy.id).toBe(survey.surveyId)
    })

    test('Should return a SurveyResultModel with LoadSurveyByIdRepository inserted count and percent both 0 if LoadSurveyResultRepository returns null', async () => {
        const { sut, loadSurveyResultRepositorySpy } = newSut()
        const surveyEmpty = mockSurveyResultEmpty()
        loadSurveyResultRepositorySpy.surveyResult = null
        const surveyResult = await sut.load(surveyEmpty.surveyId, account.id)
        expect(surveyResult).toEqual(surveyResult)
    })
})
