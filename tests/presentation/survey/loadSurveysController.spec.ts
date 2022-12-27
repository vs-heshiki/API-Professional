import { LoadSurveysController } from '@/presentation/controller/survey/loadSurvey/loadSurveysController'
import { LoadSurveys } from '@/presentation/controller/survey/loadSurvey/loadSurveysControllerProtocols'
import { success, serverError, noContent } from '@/presentation/helpers/http/httpHelpers'
import { mockDate, mockSurveys, throwError } from '@/tests/mocks'
import { mockLoadSurveys } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: LoadSurveysController
    loadSurveysStub: LoadSurveys
}

const newSut = (): SutTypes => {
    const loadSurveysStub = mockLoadSurveys()
    const sut = new LoadSurveysController(loadSurveysStub)
    return {
        sut,
        loadSurveysStub
    }
}

describe('LoadSurveys Controller', () => {
    mockDate()

    test('Should call LoadSurveys', async () => {
        const { sut, loadSurveysStub } = newSut()
        const loadSpyOn = jest.spyOn(loadSurveysStub, 'load')
        await sut.handle({})
        expect(loadSpyOn).toHaveBeenCalledWith()
    })

    test('Should return 200 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(success(mockSurveys()))
    })

    test('Should return 500 if LoadSurveys throws', async () => {
        const { sut, loadSurveysStub } = newSut()
        jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 if LoadSurveys returns empty', async () => {
        const { sut, loadSurveysStub } = newSut()
        jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(async () => {
            return Promise.resolve([])
        })
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(noContent())
    })
})
