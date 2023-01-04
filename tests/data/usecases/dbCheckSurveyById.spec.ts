import { DbCheckSurveyById } from '@/data/usecases/survey/checkSurveyById/dbCheckSurveyById'
import { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/checkSurveyByIdRepository'
import { mockCheckSurveyByIdRepository } from '@/tests/data/usecases/stubs/dbSurveyStubs'
import { mockDate, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbCheckSurveyById
    checkSurveyByIdRepositoryStub: CheckSurveyByIdRepository
}

const newSut = (): SutTypes => {
    const checkSurveyByIdRepositoryStub = mockCheckSurveyByIdRepository()
    const sut = new DbCheckSurveyById(checkSurveyByIdRepositoryStub)
    return {
        sut,
        checkSurveyByIdRepositoryStub
    }
}

describe('Database LoadSurvey UseCase', () => {
    mockDate()

    test('Should call LoadSurveyByIdRepository with correct Id', async () => {
        const { sut, checkSurveyByIdRepositoryStub } = newSut()
        const loadSpyOn = jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById')
        await sut.checkById('any_id')
        expect(loadSpyOn).toHaveBeenCalledWith('any_id')
    })

    test('Should return a true with matching id', async () => {
        const id = 'any_id'
        const { sut } = newSut()
        const check = await sut.checkById(id)
        expect(check).toBeTruthy()
    })

    test('Should throw if LoadSurveyByIdRepository throws', async () => {
        const { sut, checkSurveyByIdRepositoryStub } = newSut()
        jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById').mockImplementationOnce(throwError)
        const check = sut.checkById('any_id')
        await expect(check).rejects.toThrow()
    })
})
