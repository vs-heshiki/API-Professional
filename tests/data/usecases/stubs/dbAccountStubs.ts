import { Decrypter, Encrypter, HashCompare, Hasher, UpdateAccessTokenRepository } from '@/data/protocols/cryptography/cryptographyProtocols'
import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository } from '@/data/protocols/db/account/dbAccountProtocols'
import { AccountModel } from '@/domain/model/accountModel'
import { AddAccountParams } from '@/domain/usecases/account/useCasesAccountProtocols'
import { mockAccount } from '@/tests/mocks'

export const mockHasher = (): Hasher => {
    class GenHashStub implements Hasher {
        async genHash (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new GenHashStub()
}

export const mockAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccountParams): Promise<AccountModel> {
            return new Promise(resolve => resolve(mockAccount()))
        }
    }
    return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(mockAccount()))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

export const mockHashCompare = (): HashCompare => {
    class HashCompareStub implements HashCompare {
        async compareHash (value: string, hash: string): Promise<boolean> {
            return new Promise(resolve => resolve(true))
        }
    }
    return new HashCompareStub()
}

export const mockEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('access_token'))
        }
    }
    return new EncrypterStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async updateAccessToken (id: string, token: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}

export const mockDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt (value: string): Promise<string> {
           return new Promise(resolve => resolve('any_value'))
        }
    }
    return new DecrypterStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken (token: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(mockAccount()))
        }
    }
    return new LoadAccByTokenRepositoryStub()
}
