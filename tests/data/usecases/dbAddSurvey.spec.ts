import { DbAddSurvey } from '@/data/usecases/survey/addSurvey/dbAddSurvey'
import { AddSurveyRepositorySpy } from '@/tests/data/usecases/spy/dbSurveySpy'
import { mockDate, mockSurveyData, throwError } from '@/tests/mocks'

type SutTypes = {
    sut: DbAddSurvey
    addSurveyRepositorySpy: AddSurveyRepositorySpy
}
const newSut = (): SutTypes => {
    const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
    const sut = new DbAddSurvey(addSurveyRepositorySpy)
    return {
        sut,
        addSurveyRepositorySpy
    }
}

describe('Database AddSurvey UseCase', () => {
    const survey = mockSurveyData()

    mockDate()

    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositorySpy } = newSut()
        await sut.add(survey)
        expect(addSurveyRepositorySpy.data).toBe(survey)
    })

    test('Should throw if AddSurveyRepository throws', async () => {
        const { sut, addSurveyRepositorySpy } = newSut()
        jest.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(throwError)
        const added = sut.add(survey)
        await expect(added).rejects.toThrow()
    })
})
