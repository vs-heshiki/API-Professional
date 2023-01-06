import { DbLoadSurveyById } from '@/data/usecases/survey/loadSurveyById/dbLoadSurveyById'
import { LoadSurveyByIdRepositorySpy } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, mockSurvey, throwError } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

let id: string

type SutTypes = {
    sut: DbLoadSurveyById
    loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const newSut = (): SutTypes => {
    const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
    const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)
    return {
        sut,
        loadSurveyByIdRepositorySpy
    }
}

describe('Database LoadSurvey UseCase', () => {
    beforeAll(() => {
        id = faker.datatype.uuid()
    })

    mockDate()

    test('Should call LoadSurveyByIdRepository with correct Id', async () => {
        const { sut, loadSurveyByIdRepositorySpy } = newSut()
        await sut.loadById(id)
        expect(loadSurveyByIdRepositorySpy.id).toBe(id)
    })

    test('Should return a survey with matching id', async () => {
        const { sut } = newSut()
        const survey = await sut.loadById(id)
        expect(survey).toEqual(mockSurvey())
    })

    test('Should throw if LoadSurveyByIdRepository throws', async () => {
        const { sut, loadSurveyByIdRepositorySpy } = newSut()
        jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
        const survey = sut.loadById(id)
        await expect(survey).rejects.toThrow()
    })
})
