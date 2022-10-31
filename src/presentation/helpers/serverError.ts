import { HttpResponse } from '../protocols/http'

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: error
})
