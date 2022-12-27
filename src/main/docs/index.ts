import { signUpPath } from './paths'
import { signUpSchema, signUpParamsSchema, errorSchema } from './schemas'
import { badRequest, forbidden, serverError, success } from './components'

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
        description: ''
    }],
    paths: {
        '/sign-up': signUpPath
    },
    schemas: {
        signUp: signUpSchema,
        signUpParams: signUpParamsSchema,
        error: errorSchema
    },
    components: {
        success,
        badRequest,
        serverError,
        forbidden
    }
}
