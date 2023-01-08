import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { InvalidParamError } from '@/presentation/errors'
import { mockDate, mockSaveSurveyResultRequest, throwError } from '@/tests/mocks'
import { LoadAnswersBySurveySpy, SaveSurveyResultSpy } from '@/tests/presentation/survey/spy/surveySpy'

type SutTypes = {
    sut: SaveSurveyResultController
    loadAnswersBySurveySpy: LoadAnswersBySurveySpy
    saveSurveyResultSpy: SaveSurveyResultSpy
}

const newSut = (): SutTypes => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const loadAnswersBySurveySpy = new LoadAnswersBySurveySpy()
    const sut = new SaveSurveyResultController(loadAnswersBySurveySpy, saveSurveyResultSpy)
    return {
        sut,
        loadAnswersBySurveySpy,
        saveSurveyResultSpy
    }
}

describe('SaveSurveyResult Controller', () => {
    mockDate()

    test('Should call LoadAnswersBySurvey with correct values', async () => {
        const { sut, loadAnswersBySurveySpy } = newSut()
        const request = mockSaveSurveyResultRequest(loadAnswersBySurveySpy.resolve[0])
        await sut.handle(request)
        expect(loadAnswersBySurveySpy.id).toBe(request.surveyId)
    })

    test('Should return 403 if LoadAnswersBySurvey returns null', async () => {
        const { sut, loadAnswersBySurveySpy } = newSut()
        const request = mockSaveSurveyResultRequest(loadAnswersBySurveySpy.resolve[0])
        loadAnswersBySurveySpy.resolve = []
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if LoadAnswersBySurvey throws', async () => {
        const { sut, loadAnswersBySurveySpy } = newSut()
        const request = mockSaveSurveyResultRequest(loadAnswersBySurveySpy.resolve[0])
        jest.spyOn(loadAnswersBySurveySpy, 'loadAnswers').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 403 if invalid answer is provider', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle({
            surveyId: 'invalid_id',
            accountId: 'invalid_id',
            answer: 'invalid_answer'
        })
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
    })

    test('Should call SaveSurveyResult with correct values', async () => {
        const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = newSut()
        const request = mockSaveSurveyResultRequest(loadAnswersBySurveySpy.resolve[0])
        await sut.handle(request)
        expect(saveSurveyResultSpy.dataParams).toEqual({
            surveyId: request.surveyId,
            accountId: request.accountId,
            answer: request.answer,
            date: new Date()
        })
    })

    test('Should return 500 if SaveSurveyResult throws', async () => {
        const { sut, saveSurveyResultSpy,loadAnswersBySurveySpy } = newSut()
        jest.spyOn(saveSurveyResultSpy, 'save').mockImplementationOnce(throwError)
        const request = mockSaveSurveyResultRequest(loadAnswersBySurveySpy.resolve[0])
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut, loadAnswersBySurveySpy, saveSurveyResultSpy } = newSut()
        const request = mockSaveSurveyResultRequest(loadAnswersBySurveySpy.resolve[0])
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(success(saveSurveyResultSpy.surveyResult))
    })
})
