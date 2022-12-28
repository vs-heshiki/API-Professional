import { apiKeyAuthSchema } from '@/main/docs/schemas/apiKeyAuthSchema'
import {
    badRequest,
    forbidden,
    serverError,
    noContent,
    unauthorized,
    notFound
} from './components/'

export default {
    securitySchemes: {
        apiKeyAuth: apiKeyAuthSchema
    },
    noContent,
    badRequest,
    serverError,
    forbidden,
    unauthorized,
    notFound
}
