import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { LoadSurveyById, LoadSurveyResult } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultControllerProtocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { mockDate, mockLoadSurveyResultRequest, mockSurveyResult, throwError } from '@/tests/mocks'
import { mockLoadSurveyById, mockLoadSurveyResult } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    loadSurveyResultStub: LoadSurveyResult
}

const newSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const loadSurveyResultStub = mockLoadSurveyResult()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        loadSurveyResultStub
    }
}

describe('LoadSurveyResult Controller', () => {
    mockDate()

    test('Should call LoadSurveyById with correct value', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        const loadByIdSpyOn = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(mockLoadSurveyResultRequest())
        expect(loadByIdSpyOn).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if LoadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
        const httpResponse = await sut.handle(mockLoadSurveyResultRequest())
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('any_survey_id')))
    })

    test('Should return 500 if LoadSurveyById throws', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockLoadSurveyResultRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call LoadSurveyResult with correct value', async () => {
        const { sut, loadSurveyResultStub } = newSut()
        const loadByIdSpyOn = jest.spyOn(loadSurveyResultStub, 'load')
        await sut.handle(mockLoadSurveyResultRequest())
        expect(loadByIdSpyOn).toHaveBeenCalledWith('any_survey_id', 'any_account_id')
    })

    test('Should return 500 if LoadSurveyResult throws', async () => {
        const { sut, loadSurveyResultStub } = newSut()
        jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockLoadSurveyResultRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(mockLoadSurveyResultRequest())
        expect(httpResponse).toEqual(success(mockSurveyResult()))
    })
})
