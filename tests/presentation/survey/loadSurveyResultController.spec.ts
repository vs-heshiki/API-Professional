import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { CheckSurveyById, LoadSurveyResult } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultControllerProtocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { mockDate, mockLoadSurveyResultRequest, mockSurveyResult, throwError } from '@/tests/mocks'
import { mockCheckSurveyById, mockLoadSurveyResult } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: LoadSurveyResultController
    checkSurveyByIdStub: CheckSurveyById
    loadSurveyResultStub: LoadSurveyResult
}

const newSut = (): SutTypes => {
    const checkSurveyByIdStub = mockCheckSurveyById()
    const loadSurveyResultStub = mockLoadSurveyResult()
    const sut = new LoadSurveyResultController(checkSurveyByIdStub, loadSurveyResultStub)
    return {
        sut,
        checkSurveyByIdStub,
        loadSurveyResultStub
    }
}

describe('LoadSurveyResult Controller', () => {
    mockDate()

    test('Should call CheckSurveyById with correct value', async () => {
        const { sut, checkSurveyByIdStub } = newSut()
        const checkByIdSpyOn = jest.spyOn(checkSurveyByIdStub, 'checkById').mockReturnValueOnce(Promise.resolve(false))
        await sut.handle(mockLoadSurveyResultRequest())
        expect(checkByIdSpyOn).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if CheckSurveyById returns null', async () => {
        const { sut, checkSurveyByIdStub } = newSut()
        jest.spyOn(checkSurveyByIdStub, 'checkById').mockReturnValueOnce(null)
        const httpResponse = await sut.handle(mockLoadSurveyResultRequest())
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('any_survey_id')))
    })

    test('Should return 500 if CheckSurveyById throws', async () => {
        const { sut, checkSurveyByIdStub } = newSut()
        jest.spyOn(checkSurveyByIdStub, 'checkById').mockImplementationOnce(throwError)
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
