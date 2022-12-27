export const signUpPath = {
    post: {
        tags: ['SignUp'],
        summary: 'API to create a new user',
        requestBody: {
            description: 'Requirements to create a new user',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/signUpParams'
                    }
                }
            }
        },
        responses: {
            200: {
                $ref: '#/components/success'
            },
            400: {
                $ref: '#/components/badRequest'
            },
            403: {
                $ref: '#/components/forbidden'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
}
