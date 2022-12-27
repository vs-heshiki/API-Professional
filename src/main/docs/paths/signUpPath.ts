export const signUpPath = {
    post: {
        tags: ['Login'],
        summary: 'API to create a new user',
        requestBody: {
            description: 'Requirements to create a new user',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/signUpParams'
                    }
                }
            },
            required: true
        },
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/signUp'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            403: {
                $ref: '#/components/forbidden'
            },
            500: {
                $ref: '#/components/serverError'
            },
            404: {
                $ref: '#/components/notFound'
            }
        }
    }
}
