import { signInPath, signUpPath } from './paths'
import { signUpSchema, signUpParamsSchema, errorSchema, signInParamsSchema, signInSchema } from './schemas'
import { badRequest, forbidden, serverError, success, unauthorized } from './components'

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
        name: 'SignUp',
        description: 'Create a new user'
    }, {
        name: 'SignIn',
        description: 'Login with a user'
    }],
    paths: {
        '/sign-up': signUpPath,
        '/sign-in': signInPath
    },
    schemas: {
        signUp: signUpSchema,
        signUpParams: signUpParamsSchema,
        signIn: signInSchema,
        signInParams: signInParamsSchema,
        error: errorSchema
    },
    components: {
        success,
        badRequest,
        serverError,
        forbidden,
        unauthorized
    }
}
