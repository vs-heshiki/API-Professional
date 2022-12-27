export const surveysPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Survey'],
        summary: 'API to list all surveys',
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/surveys'
                        }
                    }
                }
            },
            403: {
                $ref: '#/components/forbidden'
            },
            204: {
                $ref: '#/components/noContent'
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
