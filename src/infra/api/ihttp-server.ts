import { Request, Response } from 'express'

export default interface IHttpServer {
    on(params: InputHttp): any
    listen(port: number): void
}

export type InputHttp = {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch'
    url: string
    callback: (req: Request, res: Response, next: any) => Promise<void>
}
