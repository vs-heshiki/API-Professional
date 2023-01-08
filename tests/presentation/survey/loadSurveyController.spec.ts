import { LoadSurveyController } from '@/presentation/controller/survey/loadSurvey/loadSurveyController'
import { success, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'
import { mockDate, mockLoadSurveyRequest, throwError } from '@/tests/mocks'
import { LoadSurveySpy } from '@/tests/presentation/survey/spy/surveySpy'

type SutTypes = {
    sut: LoadSurveyController
    loadSurveySpy: LoadSurveySpy
}

const newSut = (): SutTypes => {
    const loadSurveySpy = new LoadSurveySpy()
    const sut = new LoadSurveyController(loadSurveySpy)
    return {
        sut,
        loadSurveySpy
    }
}

describe('LoadSurvey Controller', () => {
    const request = mockLoadSurveyRequest()

    mockDate()

    test('Should call LoadSurvey with correct value', async () => {
        const { sut, loadSurveySpy } = newSut()
        await sut.handle(request)
        expect(loadSurveySpy.callsCount).toBe(1)
    })

    test('Should return 200 on success', async () => {
        const { sut, loadSurveySpy } = newSut()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(success(loadSurveySpy.loadSurveysModel))
    })

    test('Should return 500 if LoadSurvey throws', async () => {
        const { sut, loadSurveySpy } = newSut()
        jest.spyOn(loadSurveySpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 if LoadSurvey returns empty', async () => {
        const { sut, loadSurveySpy } = newSut()
        loadSurveySpy.loadSurveysModel = []
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(noContent())
    })
})
