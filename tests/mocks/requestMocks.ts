import { SignInController } from '@/presentation/controller/login/signIn/signInController'
import { SignUpController } from '@/presentation/controller/login/signUp/signUpController'
import { AuthMiddleware } from '@/presentation/controller/middlewares/authMiddleware'
import { AddSurveyController } from '@/presentation/controller/survey/addSurvey/addSurveyController'
import { LoadSurveyController } from '@/presentation/controller/survey/loadSurvey/loadSurveyController'
import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'

export const mockSignUpRequest = (): SignUpController.Request => ({
    name: 'any_name',
    email: 'any_mail@email.com',
    password: 'any_password',
    confirmPassword: 'any_password'
})

export const mockSignInRequest = (): SignInController.Request => ({
    email: 'any_mail@email.com',
    password: 'any_password'
})

export const mockAuthMiddlewareRequest = (): AuthMiddleware.Request => ({
    accessToken: 'any_access_token'
})

export const mockAddSurveyRequest = (): AddSurveyController.Request => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }]
})

export const mockSaveSurveyResultRequest = (): SaveSurveyResultController.Request => ({
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    accountId: 'any_account_id'
})

export const mockLoadSurveyResultRequest = (): LoadSurveyResultController.Request => ({
    surveyId: 'any_survey_id',
    accountId: 'any_account_id'
})

export const mockLoadSurveyRequest = (): LoadSurveyController.Request => ({
    accountId: 'any_account_id'
})
