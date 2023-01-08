import { DbLoadSurvey } from '@/data/usecases/survey/loadSurvey/dbLoadSurvey'
import { LoadSurveyRepositorySpy } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, throwError } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

let id: string

type SutTypes = {
    sut: DbLoadSurvey
    loadSurveyRepositorySpy: LoadSurveyRepositorySpy
}
const newSut = (): SutTypes => {
    const loadSurveyRepositorySpy = new LoadSurveyRepositorySpy()
    const sut = new DbLoadSurvey(loadSurveyRepositorySpy)
    return {
        sut,
        loadSurveyRepositorySpy
    }
}

describe('Database LoadSurvey UseCase', () => {
    beforeAll(() => {
        id = faker.datatype.uuid()
    })

    mockDate()

    test('Should call LoadSurveyRepository with correct value', async () => {
        const { sut, loadSurveyRepositorySpy } = newSut()
        await sut.load(id)
        expect(loadSurveyRepositorySpy.id).toBe(id)
    })

    test('Should throw if LoadSurveyRepository throws', async () => {
        const { sut, loadSurveyRepositorySpy } = newSut()
        jest.spyOn(loadSurveyRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
        const survey = sut.load(id)
        await expect(survey).rejects.toThrow()
    })

    test('Should return a list of surveys', async () => {
        const { sut, loadSurveyRepositorySpy } = newSut()
        const survey = await sut.load(id)
        expect(survey).toEqual(loadSurveyRepositorySpy.surveys)
    })
})
