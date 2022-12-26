import { LogErrorRepository } from '@/data/protocols/db/logErrorRepository'
import { success } from '@/presentation/helpers/http/httpHelpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { mockAccount } from '@/tests/mocks'

export const mockController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            return new Promise(resolve => resolve(success(mockAccount())))
        }
    }
    return new ControllerStub()
}

export const mockErrLogRepo = (): LogErrorRepository => {
    class LogErrorRepoStub implements LogErrorRepository {
        async logError (stack: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new LogErrorRepoStub()
}
