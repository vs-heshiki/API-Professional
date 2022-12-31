import { DbLoadSurveyResult } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResult'
import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResultProtocols'
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurveyResult, mockSurveyResultEmpty, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadSurveyResult
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const newSut = (): SutTypes => {
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
    return {
        sut,
        loadSurveyResultRepositoryStub,
        loadSurveyByIdRepositoryStub
    }
}

const survey = mockSurveyResult()

describe('Database LoadSurveyResult UseCase', () => {
    mockDate()
    test('Should call LoadSurveyResultRepository with correct id', async () => {
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        const loadAllSpyOn = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        await sut.load(survey.surveyId)
        expect(loadAllSpyOn).toHaveBeenCalledWith(survey.surveyId)
    })

    test('Should throw if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
        const httpResponse = sut.load(survey.surveyId)
        await expect(httpResponse).rejects.toThrow()
    })

    test('Should return a SurveyResultModel on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load(survey.surveyId)
        expect(httpResponse).toEqual(mockSurveyResult())
    })

    test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
        const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = newSut()
        const loadByIdSpyOn = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(null)
        await sut.load(survey.surveyId)
        expect(loadByIdSpyOn).toHaveBeenCalledWith(survey.surveyId)
    })

    test('Should return a SurveyResultModel with LoadSurveyByIdRepository inserted count and percent both 0 if LoadSurveyResultRepository returns null', async () => {
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        const surveyResult = mockSurveyResultEmpty()
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(null)
        const httpResponse = await sut.load(surveyResult.surveyId)
        expect(httpResponse).toEqual(surveyResult)
    })
})
