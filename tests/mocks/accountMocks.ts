import { AccountModel } from '@/domain/model/accountModel'
import { AddAccountParams, AuthenticateParams } from '@/domain/usecases/account/useCasesAccountProtocols'

export const mockAddAccountData = (): AddAccountParams => ({
    name: 'any_name',
    email: 'any_mail@email.com',
    password: 'any_password'
})

export const mockAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_mail@email.com',
    password: 'hashed_password'
})

export const mockAuthenticate = (): AuthenticateParams => ({
    email: 'any_mail@email.com',
    password: 'any_password'
})
