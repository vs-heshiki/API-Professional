export const signInPath = {
    post: {
        tags: ['Login'],
        summary: 'API to login with a user',
        requestBody: {
            description: 'Requirements login user',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/signInParams'
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
                            $ref: '#/schemas/signIn'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            401: {
                $ref: '#/components/unauthorized'
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
