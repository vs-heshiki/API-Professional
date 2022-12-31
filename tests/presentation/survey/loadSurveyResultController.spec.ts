import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { LoadSurveyById } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultControllerProtocols'
import { mockSurveyResultRequest } from '@/tests/mocks'
import { mockLoadSurveyById } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
}

const newSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub)
    return {
        sut,
        loadSurveyByIdStub
    }
}

describe('LoadSurveyResult Controller', () => {
    test('Should call LoadSurveyById with correct values', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        const loadByIdSpyOn = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(mockSurveyResultRequest())
        expect(loadByIdSpyOn).toHaveBeenCalledWith('any_survey_id')
    })
})
