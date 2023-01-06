import { DbCheckSurveyById } from '@/data/usecases/survey/checkSurveyById/dbCheckSurveyById'
import { CheckSurveyByIdRepositorySpy } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, throwError } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

let id: string

type SutTypes = {
    sut: DbCheckSurveyById
    checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const newSut = (): SutTypes => {
    const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
    const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)
    return {
        sut,
        checkSurveyByIdRepositorySpy
    }
}

describe('Database LoadSurvey UseCase', () => {
    beforeAll(() => {
        id = faker.datatype.uuid()
    })

    mockDate()

    test('Should call LoadSurveyByIdRepository with correct Id', async () => {
        const { sut, checkSurveyByIdRepositorySpy } = newSut()
        await sut.checkById(id)
        expect(checkSurveyByIdRepositorySpy.id).toBe(id)
    })

    test('Should return a true with matching id', async () => {
        const { sut } = newSut()
        const check = await sut.checkById(id)
        expect(check).toBeTruthy()
    })

    test('Should throw if LoadSurveyByIdRepository throws', async () => {
        const { sut, checkSurveyByIdRepositorySpy } = newSut()
        jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
        const check = sut.checkById(id)
        await expect(check).rejects.toThrow()
    })
})
