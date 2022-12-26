import { SurveyModel } from '@/domain/model/surveyModel'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { AddSurveyParams, SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export const mockSurveyData = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }, {
        image: 'other_image',
        answer: 'other_answer'
    }],
    date: new Date()
})

export const mockSurvey = (): SurveyModel => {
    return {
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}

export const mockSurveys = (): SurveyModel[] => {
    return [{
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
        id: 'another_id',
        question: 'another_question',
        answers: [{
            image: 'another_image',
            answer: 'another_answer'
        }],
        date: new Date()
    }]
}

export const mockSurveyResultData = (): SaveSurveyResultParams => {
    return {
        surveyId: 'survey_id',
        accountId: 'account_id',
        answer: 'any_answer',
        date: new Date()
    }
}

export const mockSurveyResult = (): SurveyResultModel => ({
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
})
