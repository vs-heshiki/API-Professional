import { SaveSurveyResultController } from '@/presentation/controller/survey/saveSurveyResult/saveSurveyResultController'
import { LoadSurveyById, HttpRequest } from '@/presentation/controller/survey/saveSurveyResult/saveSurveyResultControllerProtocols'
import { SurveyModel } from '@/domain/model/surveyModel'

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
})
