import { SignInController } from '@/presentation/controller/login/signIn/signInController'
import { SignUpController } from '@/presentation/controller/login/signUp/signUpController'
import { AuthMiddleware } from '@/presentation/controller/middlewares/authMiddleware'
import { AddSurveyController } from '@/presentation/controller/survey/addSurvey/addSurveyController'
import { LoadSurveyController } from '@/presentation/controller/survey/loadSurvey/loadSurveyController'
import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { SaveSurveyResultController } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultController'
import { faker } from '@faker-js/faker'

export const mockSignUpRequest = (): SignUpController.Request => {
    const password = faker.internet.userName()
    return {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password,
        confirmPassword: password

    }
}
export const mockSignInRequest = (): SignInController.Request => ({
    email: faker.internet.email(),
    password: faker.internet.userName()
})

export const mockAuthMiddlewareRequest = (): AuthMiddleware.Request => ({
    accessToken: faker.datatype.uuid()
})

export const mockAddSurveyRequest = (): AddSurveyController.Request => ({
    question: faker.lorem.paragraph(),
    answers: [{
        image: faker.image.cats(),
        answer: faker.word.adjective()
    }]
})

export const mockSaveSurveyResultRequest = (answer: string = null): SaveSurveyResultController.Request => ({
    surveyId: faker.datatype.uuid(),
    answer,
    accountId: faker.datatype.uuid()
})

export const mockLoadSurveyResultRequest = (): LoadSurveyResultController.Request => ({
    surveyId: faker.datatype.uuid(),
    accountId: faker.datatype.uuid()
})

export const mockLoadSurveyRequest = (): LoadSurveyController.Request => ({
    accountId: faker.datatype.uuid()
})
