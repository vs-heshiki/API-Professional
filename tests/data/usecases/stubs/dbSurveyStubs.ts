import { AddSurveyRepository, CheckSurveyByIdRepository, LoadSurveyByIdRepository, LoadSurveyRepository, SaveSurveyResultRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/loadSurveyResultRepository'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { mockSurvey, mockSurveyResult, mockSurveys } from '@/tests/mocks'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
        async add (surveyData: AddSurveyRepository.Params): Promise<void> {
            return Promise.resolve()
        }
    }
    return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById (id: string): Promise<LoadSurveyByIdRepository.Model> {
            return Promise.resolve(mockSurvey())
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

export const mockCheckSurveyByIdRepository = (): CheckSurveyByIdRepository => {
    class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
        async checkById (id: string): Promise<CheckSurveyByIdRepository.Return> {
            return Promise.resolve(true)
        }
    }
    return new CheckSurveyByIdRepositoryStub()
}

export const mockLoadSurveyRepository = (): LoadSurveyRepository => {
    class LoadSurveyRepositoryStub implements LoadSurveyRepository {
        async loadAll (accountId: string): Promise<LoadSurveyRepository.Model> {
            return Promise.resolve(mockSurveys())
        }
    }
    return new LoadSurveyRepositoryStub()
}

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultRepository.Params): Promise<void> {
            return Promise.resolve()
        }
    }
    return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
        async loadBySurveyId (id: string, accountId: string): Promise<SurveyResultModel> {
            return Promise.resolve(mockSurveyResult())
        }
    }
    return new LoadSurveyResultRepositoryStub()
}
