import { HttpRequest } from '@/presentation/protocols'

export const mockAccessTokenRequest = (): HttpRequest => ({
    headers: {
        'x-access-token': 'any_access_token'
    }
})

export const mockAccountRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_mail@email.com',
        password: 'any_password',
        confirmPassword: 'any_password'
    }
})

export const mockSurveyRequest = (): HttpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answers: 'any_answer'
        }, {
            image: 'other_image',
            answers: 'other_answer'
        }],
        date: new Date()
    }
})

export const mockSurveyResultRequest = (): HttpRequest => ({
    params: {
        surveyId: 'any_survey_id'
    },
    body: {
        answer: 'any_answer'
    },
    accountId: 'any_account_id'
})
