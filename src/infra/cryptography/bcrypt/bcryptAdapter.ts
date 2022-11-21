import { HashCompare } from '../../../data/protocols/cryptography/hashCompare'
import bcrypt from 'bcrypt'
import { Hasher } from '../../../data/protocols/cryptography/hasher'

export class BCryptAdapter implements Hasher, HashCompare {
    async genSalt (): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        return salt
    }

    async genHash (value: string): Promise<string> {
        const salt = await this.genSalt()
        const hash = await bcrypt.hash(value, salt)
        return hash
    }

    async hashCompare (value: string, hash: string): Promise<boolean> {
        const isValid = await bcrypt.compare(value, hash)
        return isValid
    }
}
