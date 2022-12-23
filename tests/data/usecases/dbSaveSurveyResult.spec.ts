import { DbSaveSurveyResult } from '@/data/usecases/saveSurveyResult/dbSaveSurveyResult'
import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel } from '@/data/usecases/saveSurveyResult/dbSaveSurveyResultProtocols'
import mockdate from 'mockdate'

const newFakeSurveyResult = (): SurveyResultModel => {
    return {
        id: 'any_id',
        surveyId: 'survey_id',
        userId: 'user_id',
        answer: 'any_answer',
        date: new Date()
    }
}

const newSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async saveResult (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(newFakeSurveyResult()))
        }
    }
    return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const newSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = newSaveSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
    return {
        sut,
        saveSurveyResultRepositoryStub
    }
}

describe('Database LoadSurveys UseCase', () => {
    beforeAll(() => {
        mockdate.set(new Date())
    })

    afterAll(() => {
        mockdate.reset()
    })

    test('Should call SaveSurveyResultRepository with correct Id', async () => {
        const { sut, saveSurveyResultRepositoryStub } = newSut()
        const saveSpyOn = jest.spyOn(saveSurveyResultRepositoryStub, 'saveResult')
        await sut.save(newFakeSurveyResult())
        expect(saveSpyOn).toHaveBeenCalledWith(newFakeSurveyResult())
    })
})
