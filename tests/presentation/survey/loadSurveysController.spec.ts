import { LoadSurveyController, SurveyModel, LoadSurveys } from '../../../src/presentation/controller/survey/loadSurvey/loadSurveysControllerProtocols'
import mockdate from 'mockdate'

const newFakeSurveys = (): SurveyModel[] => {
    return [{
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
        id: 'any_other_id',
        question: 'any_other_question',
        answers: [{
            image: 'any_other_image',
            answer: 'any_other_answer'
        }],
        date: new Date()
    }]
}

const newLoadSurveys = (): LoadSurveys => {
    class LoadSurveysStub implements LoadSurveys {
        async load (): Promise<SurveyModel[]> {
            return new Promise(resolve => resolve(newFakeSurveys()))
        }
    }
    return new LoadSurveysStub()
}

interface SutTypes {
    sut: LoadSurveyController
    loadSurveysStub: LoadSurveys
}

const newSut = (): SutTypes => {
    const loadSurveysStub = newLoadSurveys()
    const sut = new LoadSurveyController(loadSurveysStub)
    return {
        sut,
        loadSurveysStub
    }
}

describe('LoadSurveys Controller', () => {
    beforeAll(() => {
        mockdate.set(new Date())
    })

    afterAll(() => {
        mockdate.reset()
    })

    test('Should call LoadSurveys', async () => {
        const { sut, loadSurveysStub } = newSut()
        const loadSpyOn = jest.spyOn(loadSurveysStub, 'load')
        await sut.handle({})
        expect(loadSpyOn).toHaveBeenCalledWith()
    })
})
