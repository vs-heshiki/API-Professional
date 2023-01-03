import { LoadSurveyController } from '@/presentation/controller/survey/loadSurvey/loadSurveyController'
import { LoadSurvey } from '@/presentation/controller/survey/loadSurvey/loadSurveyControllerProtocols'
import { success, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'
import { mockDate, mockLoadSurveyRequest, mockSurveys, throwError } from '@/tests/mocks'
import { mockLoadSurvey } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: LoadSurveyController
    loadSurveyStub: LoadSurvey
}

const newSut = (): SutTypes => {
    const loadSurveyStub = mockLoadSurvey()
    const sut = new LoadSurveyController(loadSurveyStub)
    return {
        sut,
        loadSurveyStub
    }
}

describe('LoadSurvey Controller', () => {
    mockDate()

    test('Should call LoadSurvey with correct value', async () => {
        const { sut, loadSurveyStub } = newSut()
        const loadSpyOn = jest.spyOn(loadSurveyStub, 'load')
        const request = mockLoadSurveyRequest()
        await sut.handle(request)
        expect(loadSpyOn).toHaveBeenCalledWith(request.accountId)
    })

    test('Should return 200 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(mockLoadSurveyRequest())
        expect(httpResponse).toEqual(success(mockSurveys()))
    })

    test('Should return 500 if LoadSurvey throws', async () => {
        const { sut, loadSurveyStub } = newSut()
        jest.spyOn(loadSurveyStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockLoadSurveyRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 if LoadSurvey returns empty', async () => {
        const { sut, loadSurveyStub } = newSut()
        jest.spyOn(loadSurveyStub, 'load').mockImplementationOnce(async () => {
            return Promise.resolve([])
        })
        const httpResponse = await sut.handle(mockLoadSurveyRequest())
        expect(httpResponse).toEqual(noContent())
    })
})
