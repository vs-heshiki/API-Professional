import { DbLoadAnswersBySurvey } from '@/data/usecases/survey/loadAnswersBySurvey/dbLoadAnswersBySurvey'
import { LoadAnswersBySurveyRepositorySpy } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockSurvey, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbLoadAnswersBySurvey
    loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const newSut = (): SutTypes => {
    const loadAnswersBySurveyRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
    const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositorySpy)
    return {
        sut,
        loadAnswersBySurveyRepositorySpy
    }
}

describe('Database LoadAnswersBySurvey UseCase', () => {
    const survey = mockSurvey()

    test('Should call LoadAnswersBySurveyRepository with correct Id', async () => {
        const { sut, loadAnswersBySurveyRepositorySpy } = newSut()
        await sut.loadAnswers(survey.id)
        expect(loadAnswersBySurveyRepositorySpy.id).toBe(survey.id)
    })

    test('Should return answers on success', async () => {
        const { sut, loadAnswersBySurveyRepositorySpy } = newSut()
        const answers = await sut.loadAnswers(survey.id)
        expect(answers).toEqual([
            loadAnswersBySurveyRepositorySpy.resolve[0],
            loadAnswersBySurveyRepositorySpy.resolve[1]
        ])
    })

    test('Should return empty array if LoadAnswersBySurveyRepository returns []', async () => {
        const { sut, loadAnswersBySurveyRepositorySpy } = newSut()
        loadAnswersBySurveyRepositorySpy.resolve = []
        const answers = await sut.loadAnswers(survey.id)
        expect(answers).toEqual([])
    })

    test('Should throw if LoadAnswersBySurveyRepository throws', async () => {
        const { sut, loadAnswersBySurveyRepositorySpy } = newSut()
        jest.spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers').mockImplementationOnce(throwError)
        const answers = sut.loadAnswers(survey.id)
        await expect(answers).rejects.toThrow()
    })
})
