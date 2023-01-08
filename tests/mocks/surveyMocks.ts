import { SurveyModel } from '@/domain/model/surveyModel'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { AddSurvey, SaveSurveyResult } from '@/domain/usecases/survey/useCasesSurveyProtocols'
import { faker } from '@faker-js/faker'

export const mockSurveyData = (): AddSurvey.Params => ({
    question: faker.lorem.paragraph(),
    answers: [{
        image: faker.image.cats(),
        answer: faker.word.adjective()
    }, {
        image: faker.image.cats(),
        answer: faker.word.adjective()
    }, {
        image: faker.image.cats(),
        answer: faker.word.adjective()
    }],
    date: faker.date.recent()
})

export const mockSurvey = (): SurveyModel => {
    return {
        id: faker.datatype.uuid(),
        question: faker.lorem.paragraph(),
        answers: [{
            image: faker.image.cats(),
            answer: faker.word.adjective()
        }, {
            image: faker.image.cats(),
            answer: faker.word.adjective()
        }],
        date: faker.date.recent()
    }
}

export const mockSurveys = (): SurveyModel[] => {
    return [{
        id: faker.datatype.uuid(),
        question: faker.lorem.paragraph(),
        answers: [{
            image: faker.image.cats(),
            answer: faker.word.adjective()
        }, {
            image: faker.image.cats(),
            answer: faker.word.adjective()
        }],
        date: faker.date.recent()
    }, {
        id: faker.datatype.uuid(),
        question: faker.lorem.paragraph(),
        answers: [{
            image: faker.image.cats(),
            answer: faker.word.adjective()
        }, {
            image: faker.image.cats(),
            answer: faker.word.adjective()
        }],
        date: faker.date.recent()
    }]
}

export const mockSurveyResultData = (): SaveSurveyResult.Params => {
    return {
        surveyId: faker.datatype.uuid(),
        accountId: faker.datatype.uuid(),
        answer: faker.word.adjective(),
        date: faker.date.recent()
    }
}

export const mockSurveyResult = (): SurveyResultModel => ({
    surveyId: faker.datatype.uuid(),
    question: faker.lorem.paragraph(),
    answers: [{
        image: faker.image.cats(),
        answer: faker.word.adjective(),
        count: 1,
        percent: 50,
        isCurrentAnswer: true
    }, {
        image: faker.image.cats(),
        answer: faker.word.adjective(),
        count: 1,
        percent: 80,
        isCurrentAnswer: false
    }],
    date: faker.date.recent()
})

export const mockSurveyResultEmpty = (): SurveyResultModel => ({
    surveyId: 'any_id',
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer',
        count: 0,
        percent: 0,
        isCurrentAnswer: false
    }, {
        image: 'other_image',
        answer: 'other_answer',
        count: 0,
        percent: 0,
        isCurrentAnswer: false
    }],
    date: faker.date.recent()
})
