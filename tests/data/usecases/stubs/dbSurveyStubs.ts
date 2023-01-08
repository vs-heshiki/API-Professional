import { AddSurveyRepository, CheckSurveyByIdRepository, LoadAnswersBySurveyRepository, LoadSurveyByIdRepository, LoadSurveyRepository, SaveSurveyResultRepository } from '@/data/protocols/db/survey/dbSurveyProtocols'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey/loadSurveyResultRepository'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { mockSurvey, mockSurveyResult, mockSurveys } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
    data: AddSurveyRepository.Params

    async add (surveyData: AddSurveyRepository.Params): Promise<void> {
        this.data = surveyData
        return Promise.resolve()
    }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
    id: string
    survey = mockSurvey()

    async loadById (id: string): Promise<LoadSurveyByIdRepository.Model> {
        this.id = id
        return Promise.resolve(this.survey)
    }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepository {
    id: string
    resolve = [
        faker.lorem.paragraph(),
        faker.lorem.paragraph()
    ]

    async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Resolve> {
        this.id = id
        return this.resolve
    }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
    id: string
    result = true

    async checkById (id: string): Promise<CheckSurveyByIdRepository.Return> {
        this.id = id
        return Promise.resolve(this.result)
    }
}

export class LoadSurveyRepositorySpy implements LoadSurveyRepository {
    id: string
    surveys = mockSurveys()

    async loadAll (accountId: string): Promise<LoadSurveyRepository.Model> {
        this.id = accountId
        return Promise.resolve(this.surveys)
    }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
    surveyId: string
    accountId: string
    surveyResult = mockSurveyResult()

    async loadBySurveyId (id: string, accountId: string): Promise<SurveyResultModel> {
        this.surveyId = id
        this.accountId = accountId
        return Promise.resolve(this.surveyResult)
    }
}

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
    data: SaveSurveyResultRepository.Params

    async save (data: SaveSurveyResultRepository.Params): Promise<void> {
        this.data = data
        return Promise.resolve()
    }
}
