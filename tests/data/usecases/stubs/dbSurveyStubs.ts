import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository, SaveSurveyResultRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/loadSurveyResultRepository'
import { SurveyModel } from '@/domain/model/surveyModel'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { AddSurveyParams, SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'
import { mockSurvey, mockSurveyResult, mockSurveys } from '@/tests/mocks'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
        async add (surveyData: AddSurveyParams): Promise<void> {
            return Promise.resolve()
        }
    }
    return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById (id: string): Promise<SurveyModel> {
            return Promise.resolve(mockSurvey())
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
        async loadAll (): Promise<SurveyModel[]> {
            return Promise.resolve(mockSurveys())
        }
    }
    return new LoadSurveysRepositoryStub()
}

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return Promise.resolve(mockSurveyResult())
        }
    }
    return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
        async loadSurveyById (id: string): Promise<SurveyResultModel> {
            return Promise.resolve(mockSurveyResult())
        }
    }
    return new LoadSurveyResultRepositoryStub()
}
