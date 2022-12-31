import { DbLoadSurveyResult } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResult'
import { LoadSurveyResultRepository } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResultProtocols'
import { mockLoadSurveyResultRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockSurveyResult, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadSurveyResult
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const newSut = (): SutTypes => {
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    return {
        sut,
        loadSurveyResultRepositoryStub
    }
}

const survey = mockSurveyResult()

describe('Database LoadSurveyResult UseCase', () => {
    test('Should call LoadSurveyResultRepository with correct id', async () => {
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        const loadAllSpyOn = jest.spyOn(loadSurveyResultRepositoryStub, 'loadSurveyById')
        await sut.load(survey.surveyId)
        expect(loadAllSpyOn).toHaveBeenCalledWith(survey.surveyId)
    })

    test('Should throw if LoadSurveyResultRepository throws', async () => {
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadSurveyById').mockImplementationOnce(throwError)
        const httpResponse = sut.load(survey.surveyId)
        await expect(httpResponse).rejects.toThrow()
    })

    test('Should return a SurveyResultModel on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.load(survey.surveyId)
        expect(httpResponse).toEqual(mockSurveyResult())
    })
})
