import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'
import { LoadSurveyById, SaveSurveyResult } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultControllerProtocols'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { InvalidParamError } from '@/presentation/errors'
import { mockDate, mockSurveyResult, mockSurveyResultRequest, throwError } from '@/tests/mocks'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: SaveSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    saveSurveyResultStub: SaveSurveyResult
}

const newSut = (): SutTypes => {
    const saveSurveyResultStub = mockSaveSurveyResult()
    const loadSurveyByIdStub = mockLoadSurveyById()
    const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        saveSurveyResultStub
    }
}

describe('SaveSurveyResult Controller', () => {
    mockDate()

    test('Should call LoadSurveyById with correct values', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        const loadSpyOn = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(mockSurveyResultRequest())
        expect(loadSpyOn).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if LoadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
        const httpResponse = await sut.handle(mockSurveyResultRequest())
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if LoadSurveyById throws', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSurveyResultRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 403 if invalid answer is provider', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle({
            params: {
                surveyId: 'any_survey_id'
            },
            body: {
                answer: 'invalid_answer'
            }
        })
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
    })

    test('Should call SaveSurveyResult with correct values', async () => {
        const { sut, saveSurveyResultStub } = newSut()
        const loadSpyOn = jest.spyOn(saveSurveyResultStub, 'save')
        await sut.handle(mockSurveyResultRequest())
        expect(loadSpyOn).toHaveBeenCalledWith({
            surveyId: 'any_survey_id',
            accountId: 'any_account_id',
            answer: 'any_answer',
            date: new Date()
        })
    })

    test('Should return 500 if SaveSurveyResult throws', async () => {
        const { sut, saveSurveyResultStub } = newSut()
        jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSurveyResultRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(mockSurveyResultRequest())
        expect(httpResponse).toEqual(success(mockSurveyResult()))
    })
})
