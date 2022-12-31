export const surveyResultPath = {
    put: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Survey'],
        summary: 'API to create a survey result',
        parameters: [{
            name: 'surveyId',
            in: 'path',
            description: 'Survey Id',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        requestBody: {
            description: 'Requirements to create a survey result',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/saveSurveyParams'
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
                            $ref: '#/schemas/surveyResult'
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
    },
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Survey'],
        summary: 'API to load a survey result',
        parameters: [{
            name: 'surveyId',
            in: 'path',
            description: 'Survey Id',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/surveyResult'
                        }
                    }
                }
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
