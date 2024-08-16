import { Redis } from 'ioredis'
import { ICache } from './ICache'
import Logger from '../logger'

export class RedisAdapter extends Redis implements ICache {
    constructor() {
        super({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT!),
            password: process.env.REDIS_PASSWORD,
        })
        super.on('error', (err: Error) => {
            Logger.instance.error(`REDIS : ${err.message}`)
        })
        super.on('connect', () => {
            Logger.instance.success('REDIS : Connected')
        })
    }
    async delete(key: string) {
        await this.del(key)
    }
    async Get(value: string): Promise<string | null> {
        return this.get(value)
    }
    async Set(key: string, value: string, ttl?: number): Promise<void> {
        if (ttl) {
            this.set(key, value, 'EX', ttl)
        } else {
            this.set(key, value)
        }
    }
}
