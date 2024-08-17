import express, { NextFunction, Request, Response } from "express";
import IHttpServer, { InputHttp } from "../ihttp-server";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../../../../swagger.json";
import cors from "cors";
import redoc from "redoc-express";
import Logger from "../../logger";
export default class ExpressAdapter implements IHttpServer {
  app: express.Express;
  constructor() {
    this.app = express();
    this.app.set("trust proxy", 1);
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "DELETE", "PUT", "POST"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      Logger.instance.debug(`${req.method} ${req.url}`);
      next();
    });
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.use("/swagger", (_: Request, res: Response) => {
      return res.sendFile(process.cwd() + "/swagger.json");
    });
    this.app.get("/docs/swagger.json", (req, res) => {
      res.sendFile("swagger.json", { root: "." });
    });
    this.app.get(
      "/docs",
      redoc({
        title: "API Docs",
        specUrl: "/docs/swagger.json",
        nonce: "",
        redocOptions: {
          theme: {
            colors: {
              primary: {
                main: "#6EC5AB",
              },
            },
            typography: {
              fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
              fontSize: "15px",
              lineHeight: "1.5",
              code: {
                code: "#87E8C7",
                backgroundColor: "#4D4D4E",
              },
            },
            menu: {
              backgroundColor: "#ffffff",
            },
          },
        },
      })
    );
    this.app.use("/doc", (req: Request, res: Response) => {
      return res.sendFile(process.cwd() + "/redoc-static.html");
    });
  }
  on(params: InputHttp) {
    const { callback, method, url } = params;
    this.app[method](
      url,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await callback(req, res, next);
        } catch (err: any) {
          Logger.instance.error(`[ERROR]: ${err.message}`);
          res.status(500).send({
            error: true,
            message: err.message,
          });
        }
      }
    );
  }

  listen(port: number): void {
    this.app.listen(port);
    Logger.instance.success(`Server is running on port ${port}`);
    Logger.instance.success(`Swagger available at http://localhost:${port}/swagger`);
  }
}
