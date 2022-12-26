import { SurveyModel } from '@/domain/model/surveyModel'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { AddSurvey, AddSurveyParams, LoadSurveyById, LoadSurveys, SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'
import { mockSurvey, mockSurveyResult, mockSurveys } from '@/tests/mocks'
import { Validator } from '@/validations/protocols/validator'

export const mockValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate (input: any): Error | null {
            return null
        }
    }
    return new ValidatorStub()
}

export const mockAddSurveyStub = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
        async add (data: AddSurveyParams): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
    class LoadSurveysStub implements LoadSurveys {
        async load (): Promise<SurveyModel[]> {
            return new Promise(resolve => resolve(mockSurveys()))
        }
    }
    return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return new Promise(resolve => resolve(mockSurvey()))
        }
    }
    return new LoadSurveyByIdStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
    class SaveSurveyResultStub implements SaveSurveyResult {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return new Promise(resolve => resolve(mockSurveyResult()))
        }
    }
    return new SaveSurveyResultStub()
}
