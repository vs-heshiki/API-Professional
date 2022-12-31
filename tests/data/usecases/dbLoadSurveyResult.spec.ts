import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/loadSurveyResultRepository'
import { DbLoadSurveyResult } from '@/data/usecases/survey/loadSurveyResult/dbLoadSurveyResult'
import { mockLoadSurveyResultRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockSurveyResult } from '@/tests/mocks'

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

describe('Database LoadSurveyResult UseCase', () => {
    test('Should call LoadSurveyResultRepository with correct id', async () => {
        const survey = mockSurveyResult()
        const { sut, loadSurveyResultRepositoryStub } = newSut()
        const loadAllSpyOn = jest.spyOn(loadSurveyResultRepositoryStub, 'loadSurveyById')
        await sut.load(survey.surveyId)
        expect(loadAllSpyOn).toHaveBeenCalledWith(survey.surveyId)
    })
})
