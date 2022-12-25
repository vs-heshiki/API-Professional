import { SaveSurveyResultController } from '@/presentation/controller/survey/saveSurveyResult/saveSurveyResultController'
import { SurveyModel } from '@/domain/model/surveyModel'
import { LoadSurveyById, HttpRequest } from '@/presentation/controller/survey/saveSurveyResult/saveSurveyResultControllerProtocols'
import { forbidden, serverError } from '@/presentation/helpers/http/httpHelpers'
import { InvalidParamError } from '@/presentation/errors'

const newFakeRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_survey_id'
    }
})

const newFakeSurvey = (): SurveyModel => {
    return {
        id: 'any_survey_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}

const newLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return new Promise(resolve => resolve(newFakeSurvey()))
        }
    }
    return new LoadSurveyByIdStub()
}

type SutTypes = {
    sut: SaveSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
}

const newSut = (): SutTypes => {
    const loadSurveyByIdStub = newLoadSurveyById()
    const sut = new SaveSurveyResultController(loadSurveyByIdStub)
    return {
        sut,
        loadSurveyByIdStub
    }
}

describe('SaveSurveyResult Controller', () => {
    test('Should call LoadSurveyById with correct values', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        const loadSpyOn = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(newFakeRequest())
        expect(loadSpyOn).toHaveBeenCalledWith('any_survey_id')
    })
    test('Should return 403 if LoadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if LoadSurveyById throws', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
