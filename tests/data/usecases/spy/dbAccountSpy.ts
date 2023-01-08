import { Decrypter, Encrypter, HashCompare, Hasher, UpdateAccessTokenRepository } from '@/data/protocols/cryptography/cryptographyProtocols'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository } from '@/data/protocols/db/account/dbAccountProtocols'
import { mockAccount } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

export class HasherSpy implements Hasher {
    hashed = faker.internet.password()
    value: string

    async genHash (value: string): Promise<string> {
        this.value = value
        return Promise.resolve(this.hashed)
    }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
    accountModel = mockAccount()
    addAccountParams: AddAccountRepository.Params

    async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Resolve> {
        this.addAccountParams = accountData
        return this.accountModel
    }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    accountModel = mockAccount()
    email: string

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Resolve> {
        this.email = email
        return Promise.resolve(this.accountModel)
    }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    result = false
    email: string

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Resolve> {
        this.email = email
        return this.result
    }
}

export class HashCompareSpy implements HashCompare {
    result = true
    value: string
    hash: string

    async compareHash (value: string, hash: string): Promise<boolean> {
        this.value = value
        this.hash = hash
        return Promise.resolve(this.result)
    }
}

export class EncrypterSpy implements Encrypter {
    value: string
    accessToken = faker.internet.password()

    async encrypt (value: string): Promise<string> {
        this.value = value
        return Promise.resolve(this.accessToken)
    }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    id: string
    token: string

    async updateAccessToken (id: string, token: string): Promise<void> {
        this.id = id
        this.token = token
        return Promise.resolve()
    }
}

export class DecrypterSpy implements Decrypter {
    value: string

    async decrypt (value: string): Promise<string> {
        this.value = value
        return this.value
    }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
    token: string
    role?: string
    id = {
        accountId: faker.datatype.uuid()
    }

    async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Resolve> {
        this.token = token
        this.role = role
        return this.id
    }
}
