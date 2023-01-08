import { LogErrorRepository } from '@/data/protocols/db/logErrorRepository'
import { success } from '@/presentation/helpers/http/httpHelpers'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { faker } from '@faker-js/faker'

export class ControllerSpy implements Controller {
    request: any
    response = success(faker.datatype.uuid())

    async handle (request: any): Promise<HttpResponse> {
        this.request = request
        return this.response
    }
}

export class LogErrorRepositorySpy implements LogErrorRepository {
    stack: string

    async logError (stack: string): Promise<void> {
        this.stack = stack
        return Promise.resolve()
    }
}
