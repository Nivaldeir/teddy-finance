import { CasesFactory } from "../../../core/app/factory/cases-factory"
import Injectable from "../../di/Injectable"
import IHttpServer from "../ihttp-server"

export default abstract class HttpController {
    httpServer: IHttpServer
    @Injectable('factory_usecases')
    factory : CasesFactory
    constructor(httpServer: IHttpServer) {
        this.httpServer = httpServer
        this.handle()
    }
    abstract handle(): void
}
