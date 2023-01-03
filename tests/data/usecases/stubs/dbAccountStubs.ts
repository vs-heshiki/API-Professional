import { Decrypter, Encrypter, HashCompare, Hasher, UpdateAccessTokenRepository } from '@/data/protocols/cryptography/cryptographyProtocols'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository } from '@/data/protocols/db/account/dbAccountProtocols'
import { AddAccount } from '@/domain/usecases/account/useCasesAccountProtocols'
import { mockAccount } from '@/tests/mocks'

export const mockHasher = (): Hasher => {
    class GenHashStub implements Hasher {
        async genHash (value: string): Promise<string> {
            return Promise.resolve('hashed_password')
        }
    }
    return new GenHashStub()
}

export const mockAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccount.Params): Promise<AddAccount.Model> {
            return Promise.resolve(mockAccount())
        }
    }
    return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Model> {
            return Promise.resolve(mockAccount())
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

export const mockCheckAccountByEmailRepository = (): CheckAccountByEmailRepository => {
    class CheckAccountByEmailRepositoryStub implements CheckAccountByEmailRepository {
        async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Return> {
            return Promise.resolve(false)
        }
    }
    return new CheckAccountByEmailRepositoryStub()
}

export const mockHashCompare = (): HashCompare => {
    class HashCompareStub implements HashCompare {
        async compareHash (value: string, hash: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new HashCompareStub()
}

export const mockEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
        return Promise.resolve('access_token')
        }
    }
    return new EncrypterStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async updateAccessToken (id: string, token: string): Promise<void> {
            return Promise.resolve()
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}

export const mockDecrypter = (): Decrypter => {
    class DecrypterStub implements Decrypter {
        async decrypt (value: string): Promise<string> {
           return Promise.resolve('any_value')
        }
    }
    return new DecrypterStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Model> {
            return Promise.resolve({ accountId: 'any_id' })
        }
    }
    return new LoadAccByTokenRepositoryStub()
}
