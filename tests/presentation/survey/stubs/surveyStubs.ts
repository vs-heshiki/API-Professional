import { AddSurvey, LoadSurveyById, LoadSurveyResult, LoadSurvey, SaveSurveyResult } from '@/domain/usecases/survey/useCasesSurveyProtocols'
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
        async add (data: AddSurvey.Params): Promise<void> {
            return Promise.resolve()
        }
    }
    return new AddSurveyStub()
}

export const mockLoadSurvey = (): LoadSurvey => {
    class LoadSurveyStub implements LoadSurvey {
        async load (): Promise<LoadSurvey.Model> {
            return Promise.resolve(mockSurveys())
        }
    }
    return new LoadSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<LoadSurveyById.Model> {
            return Promise.resolve(mockSurvey())
        }
    }
    return new LoadSurveyByIdStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
    class SaveSurveyResultStub implements SaveSurveyResult {
        async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
            return Promise.resolve(mockSurveyResult())
        }
    }
    return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
    class LoadSurveyResult implements LoadSurveyResult {
        async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Model> {
            return Promise.resolve(mockSurveyResult())
        }
    }
    return new LoadSurveyResult()
}
