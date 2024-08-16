import { Request, Response } from "express";
import Middlware from "./middleware";
import HttpController from "./http-controller";
import { authCreate } from "./schema/auth-schema";

export default class AuthController extends HttpController {
  handle() {
    this.httpServer.on({
      method: "post",
      url: "/auth",
      callback: this.auth.bind(this),
    });
  }

  @Middlware.validateSchema(authCreate)
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const output = await this.factory.authUser.execute({
      email,
      password,
    });
    res.status(200).send({
      message: "Sucesso",
      data: output,
    });
  }
}
