import { AddSurvey, LoadSurveyResult, LoadSurvey, SaveSurveyResult, CheckSurveyById, LoadAnswersBySurvey } from '@/domain/usecases/survey/useCasesSurveyProtocols'
import { mockSurveyResult, mockSurveys } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

export class AddSurveySpy implements AddSurvey {
    addSurveyParams: AddSurvey.Params

    async add (data: AddSurvey.Params): Promise<void> {
        this.addSurveyParams = data
        return Promise.resolve()
    }
}

export class LoadSurveySpy implements LoadSurvey {
    loadSurveysModel = mockSurveys()
    callsCount = 0

    async load (): Promise<LoadSurvey.Model> {
        this.callsCount++
        return this.loadSurveysModel
    }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
    resolve = [
        faker.address.streetAddress(),
        faker.address.streetAddress()
    ]

    id: string

    async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Resolve> {
        this.id = id
        return this.resolve
    }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
    id: string
    resolve = true

    async checkById (id: string): Promise<boolean> {
        this.id = id
        return Promise.resolve(this.resolve)
    }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
    dataParams: SaveSurveyResult.Params
    surveyResult = mockSurveyResult()

    async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
        this.dataParams = data
        return this.surveyResult
    }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
    surveyId: string
    accountId: string
    surveyResult = mockSurveyResult()

    async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Model> {
        this.surveyId = surveyId
        this.accountId = accountId
        return this.surveyResult
    }
}
