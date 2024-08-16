export interface ICache {
    Get(key: string): Promise<any>
    Set(key: string, value: any, ttl?: number): Promise<void>
    delete(key: string): Promise<void>
}
