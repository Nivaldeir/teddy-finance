import { createHash, randomBytes } from 'crypto'

export class Password {
    constructor(
        readonly value: string,
         readonly salt: string
    ) {}

    static create(password: string): Password {
        const salt = randomBytes(16).toString("base64")
        const hash = createHash('sha256')
            .update(password + salt)
            .digest('hex')
        const passwordHash = salt + '.' + hash
        return new Password(passwordHash, salt)
    }
    validate(password: string) {
        const hash = createHash('sha256')
            .update(password + this.salt)
            .digest('hex')
        const inputHash = this.salt + '.' + hash
        return this.value == inputHash
    }
}
