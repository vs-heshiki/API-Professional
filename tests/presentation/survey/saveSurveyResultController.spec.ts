import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'
import { LoadSurveyById, HttpRequest } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultControllerProtocols'
import { forbidden, serverError, success } from '@/presentation/helpers/http/httpHelpers'
import { InvalidParamError } from '@/presentation/errors'
import { SurveyModel } from '@/domain/model/surveyModel'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'
import mockdate from 'mockdate'

const newFakeRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_survey_id'
    },
    body: {
        answer: 'any_answer'
    },
    accountId: 'any_account_id'
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

const newFakeSurveyResult = (): SurveyResultModel => ({
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
})

const newLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return new Promise(resolve => resolve(newFakeSurvey()))
        }
    }
    return new LoadSurveyByIdStub()
}

const newSaveSurveyResult = (): SaveSurveyResult => {
    class SaveSurveyResultStub implements SaveSurveyResult {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(newFakeSurveyResult()))
        }
    }
    return new SaveSurveyResultStub()
}

type SutTypes = {
    sut: SaveSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    saveSurveyResultStub: SaveSurveyResult
}

const newSut = (): SutTypes => {
    const saveSurveyResultStub = newSaveSurveyResult()
    const loadSurveyByIdStub = newLoadSurveyById()
    const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        saveSurveyResultStub
    }
}

describe('SaveSurveyResult Controller', () => {
    beforeAll(() => {
        mockdate.set(new Date())
    })

    afterAll(() => {
        mockdate.reset()
    })
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
        await sut.handle(newFakeRequest())
        expect(loadSpyOn).toHaveBeenCalledWith({
            surveyId: 'any_survey_id',
            accountId: 'any_account_id',
            answer: 'any_answer',
            date: new Date()
        })
    })

    test('Should return 500 if SaveSurveyResult throws', async () => {
        const { sut, saveSurveyResultStub } = newSut()
        jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = newSut()
        const httpResponse = await sut.handle(newFakeRequest())
        expect(httpResponse).toEqual(success(newFakeSurveyResult()))
    })
})
