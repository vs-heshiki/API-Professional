import { DbSaveSurveyResult } from '@/data/usecases/saveSurveyResult/dbSaveSurveyResult'
import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel } from '@/data/usecases/saveSurveyResult/dbSaveSurveyResultProtocols'
import mockdate from 'mockdate'

const newFakeSurveyResultData = (): SaveSurveyResultModel => {
    return {
        surveyId: 'survey_id',
        accountId: 'account_id',
        answer: 'any_answer',
        date: new Date()
    }
}

const newFakeSurveyResult = (): SurveyResultModel => Object.assign({}, newFakeSurveyResultData(), {
    id: 'any_id'
})

const newSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
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
        const saveSpyOn = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
        await sut.save(newFakeSurveyResultData())
        expect(saveSpyOn).toHaveBeenCalledWith(newFakeSurveyResultData())
    })

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = newSut()
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = sut.save(newFakeSurveyResultData())
        await expect(httpResponse).rejects.toThrow()
    })

    test('Should return a Survey Result on success', async () => {
        const { sut } = newSut()
        const surveyResult = await sut.save(newFakeSurveyResultData())
        expect(surveyResult).toEqual(newFakeSurveyResult())
    })
})
