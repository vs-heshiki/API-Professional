import { DbLoadAnswersBySurvey } from '@/data/usecases/survey/loadAnswersBySurvey/dbLoadAnswersBySurvey'
import { LoadSurveyByIdRepositorySpy } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockSurvey, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadAnswersBySurvey
    loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const newSut = (): SutTypes => {
    const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
    const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositorySpy)
    return {
        sut,
        loadSurveyByIdRepositorySpy
    }
}

describe('Database LoadAnswersBySurvey UseCase', () => {
    const survey = mockSurvey()

    test('Should call LoadSurveyByIdRepository with correct Id', async () => {
        const { sut, loadSurveyByIdRepositorySpy } = newSut()
        await sut.loadAnswers(survey.id)
        expect(loadSurveyByIdRepositorySpy.id).toBe(survey.id)
    })

    test('Should return answers on success', async () => {
        const { sut, loadSurveyByIdRepositorySpy } = newSut()
        const answers = await sut.loadAnswers(survey.id)
        expect(answers).toEqual([
            loadSurveyByIdRepositorySpy.survey.answers[0].answer,
            loadSurveyByIdRepositorySpy.survey.answers[1].answer
        ])
    })

    test('Should return empty array if LoadSurveyByIdRepository returns null', async () => {
        const { sut, loadSurveyByIdRepositorySpy } = newSut()
        loadSurveyByIdRepositorySpy.survey = null
        const answers = await sut.loadAnswers(survey.id)
        expect(answers).toEqual([])
    })

    test('Should throw if LoadSurveyByIdRepository throws', async () => {
        const { sut, loadSurveyByIdRepositorySpy } = newSut()
        jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
        const answers = sut.loadAnswers(survey.id)
        await expect(answers).rejects.toThrow()
    })
})
