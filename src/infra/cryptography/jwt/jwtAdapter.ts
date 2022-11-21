import jwt from 'jsonwebtoken'
import { Encrypter } from './../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
    private readonly secret: string

    constructor (secret: string) {
        this.secret = secret
    }

    async encrypt (value: string): Promise<string> {
        const sign = jwt.sign({ id: value }, this.secret)
        return sign
    }
}
