export const signInSchema = {
    type: 'object',
    properties: {
        accessToken: {
            type: 'string'
        },
        name: {
            type: 'string'
        }
    }
}
