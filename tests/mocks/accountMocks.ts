import { AccountModel } from '@/domain/model/accountModel'
import { AddAccount, Authenticate } from '@/domain/usecases/account/useCasesAccountProtocols'
import { faker } from '@faker-js/faker'

export const mockAddAccountData = (): AddAccount.Params => ({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockAccount = (): AccountModel => ({
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockAuthenticate = (): Authenticate.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})
