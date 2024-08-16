import { Request, Response } from "express";
import Middlware from "./middleware";
import HttpController from "./http-controller";
import {
  shortenedUrlsCreate,
  shortenedUrlsDelete,
  shortenedUrlsUpdate,
} from "./schema/shortened-urls";
import { userCreate, userUpdate } from "./schema/user-schema";

export default class UserController extends HttpController {
  handle() {
    this.httpServer.on({
      method: "post",
      url: "/user",
      callback: this.create.bind(this),
    });
    this.httpServer.on({
      method: "patch",
      url: "/user/:id",
      callback: this.update.bind(this),
    });
    this.httpServer.on({
      method: "delete",
      url: "/user/:id",
      callback: this.delete.bind(this),
    });
  }

  @Middlware.validateSchema(userCreate)
  async create(req: Request, res: Response) {
    const { email, password, username } = req.body;
    const output = await this.factory.createUser.execute({
      email,
      password,
      username,
    });
    res.status(201).send({
      message: "Sucesso",
      data: output,
    });
  }

  @Middlware.validateRequest()
  @Middlware.validateSchema(userUpdate)
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { password, username } = req.body;
    const output = await this.factory.updateUser.execute({
      id,
      password,
      username,
    });
    res.send({
      message: "Sucesso",
      data: output,
    });
  }

  @Middlware.validateRequest()
  @Middlware.validateSchema(shortenedUrlsDelete)
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const output = await this.factory.deleteUser.execute({ id });
    res.send({
      message: "Sucesso",
      data: output,
    });
  }
}
