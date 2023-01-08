import { LoadAccountByToken } from '@/domain/usecases/account/useCasesAccountProtocols'
import { faker } from '@faker-js/faker'

export class LoadAccountByTokenSpy implements LoadAccountByToken {
    token: string
    role?: string
    id = { accountId: faker.datatype.uuid() }

    async load (token: string, role?: string): Promise<LoadAccountByToken.Resolve> {
        this.token = token
        this.role = role

        return Promise.resolve(this.id)
    }
}
