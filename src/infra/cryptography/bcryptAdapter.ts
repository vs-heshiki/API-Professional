import bcrypt from 'bcrypt'

import { Hasher } from '../../data/protocols/cryptography/hasher'

export class BCryptAdapter implements Hasher {
    async genSalt (): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        return salt
    }

    async hash (value: string): Promise<string> {
        const salt = await this.genSalt()
        const hash = await bcrypt.hash(value, salt)
        return hash
    }
}
