import { Encrypter } from '../../data/usecases/protocols/criptography/encrypter'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Encrypter {
    async genSalt (): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        return salt
    }

    async encrypt (value: string): Promise<string> {
        const salt = await this.genSalt()
        const hash = await bcrypt.hash(value, salt)
        return hash
    }
}
