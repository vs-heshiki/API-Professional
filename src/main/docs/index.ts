import { signInPath, signUpPath, surveyPath } from './paths'
import { signUpSchema, signUpParamsSchema, errorSchema, signInParamsSchema, signInSchema, surveysSchema, surveySchema, surveyAnswerSchema, apiKeyAuthSchema, surveyParamsSchema } from './schemas'
import { badRequest, forbidden, serverError, noContent, unauthorized, notFound } from './components'

export default {
    openapi: '3.0.3',
    info: {
        title: 'API Professional',
        description: 'API Rest based in Typescript, follow TDD design, SOLID principles and Clean Architecture',
        version: '1.0.0'
    },
    servers: [{
        url: '/api'
    }],
    tags: [{
        name: 'Login',
        description: 'API to create and authenticate users'
    }, {
        name: 'Survey',
        description: 'API to create and list surveys'
    }],
    paths: {
        '/sign_up': signUpPath,
        '/sign_in': signInPath,
        '/survey': surveyPath
    },
    schemas: {
        signUp: signUpSchema,
        signUpParams: signUpParamsSchema,
        signIn: signInSchema,
        signInParams: signInParamsSchema,
        surveys: surveysSchema,
        survey: surveySchema,
        surveyAnswer: surveyAnswerSchema,
        surveyParams: surveyParamsSchema,
        error: errorSchema
    },
    components: {
        securitySchemes: {
            apiKeyAuth: apiKeyAuthSchema
        },
        noContent,
        badRequest,
        serverError,
        forbidden,
        unauthorized,
        notFound
    }
}
