import { Encrypter } from './../../data/usecases/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Encrypter {
    private readonly salt: string

    constructor (salt: string) {
        this.salt = salt
    }

    async encrypt (value: string): Promise<string> {
        await bcrypt.hash(value, this.salt)
        return null
    }
}
