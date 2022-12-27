export const signUpParamsSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        confirmPassword: {
            type: 'string'
        }
    },
    require: ['name', 'email', 'password', 'confirmPassword']
}
