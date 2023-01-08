import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { mockDate, mockLoadSurveyResultRequest, throwError } from '@/tests/mocks'
import { CheckSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: LoadSurveyResultController
    checkSurveyByIdSpy: CheckSurveyByIdSpy
    loadSurveyResultSpy: LoadSurveyResultSpy
}

const newSut = (): SutTypes => {
    const checkSurveyByIdSpy = new CheckSurveyByIdSpy()
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const sut = new LoadSurveyResultController(checkSurveyByIdSpy, loadSurveyResultSpy)
    return {
        sut,
        checkSurveyByIdSpy,
        loadSurveyResultSpy
    }
}

describe('LoadSurveyResult Controller', () => {
    const request = mockLoadSurveyResultRequest()

    mockDate()

    test('Should call CheckSurveyById with correct value', async () => {
        const { sut, checkSurveyByIdSpy } = newSut()
        await sut.handle(request)
        expect(checkSurveyByIdSpy.id).toBe(request.surveyId)
    })

    test('Should return 403 if CheckSurveyById returns null', async () => {
        const { sut, checkSurveyByIdSpy } = newSut()
        checkSurveyByIdSpy.resolve = null
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if CheckSurveyById throws', async () => {
        const { sut, checkSurveyByIdSpy } = newSut()
        jest.spyOn(checkSurveyByIdSpy, 'checkById').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call LoadSurveyResult with correct value', async () => {
        const { sut, loadSurveyResultSpy } = newSut()
        await sut.handle(request)
        expect(loadSurveyResultSpy.accountId).toBe(request.accountId)
        expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId)
    })

    test('Should return 500 if LoadSurveyResult throws', async () => {
        const { sut, loadSurveyResultSpy } = newSut()
        jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut, loadSurveyResultSpy } = newSut()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(success(loadSurveyResultSpy.surveyResult))
    })
})
