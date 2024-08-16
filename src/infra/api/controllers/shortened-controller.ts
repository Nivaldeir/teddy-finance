import { Request, Response } from "express";
import Middlware from "./middleware";
import HttpController from "./http-controller";
import {
  shortenedUrlsCreate,
  shortenedUrlsDelete,
  shortenedUrlsUpdate,
} from "./schema/shortened-urls";
import { Token } from "../../../core/domain/usecase/token";

export default class ShortenedController extends HttpController {
  handle() {
    this.httpServer.on({
      method: "post",
      url: "/shortened",
      callback: this.create.bind(this),
    });
    this.httpServer.on({
      method: "patch",
      url: "/shortened/:id",
      callback: this.update.bind(this),
    });
    this.httpServer.on({
      method: "delete",
      url: "/shortened/:id",
      callback: this.delete.bind(this),
    });
    this.httpServer.on({
      method: "get",
      url: "/shortened/:id",
      callback: this.findById.bind(this),
    });
    this.httpServer.on({
      method: "get",
      url: "/shortened/link/:link",
      callback: this.findByLink.bind(this),
    });
    this.httpServer.on({
      method: "get",
      url: "/shortened",
      callback: this.findMany.bind(this),
    });
  }

  @Middlware.validateSchema(shortenedUrlsCreate)
  async create(req: Request, res: Response) {
    const { url } = req.body;
    const user = Token.verify(req.headers.authorization?.split(" ")[1]!);
    const output = await this.factory.createUrl.execute({
      userId: user?.id,
      link: url,
    });
    res.status(201).send({
      message: "Sucesso",
      data: output,
    });
  }

  @Middlware.validateRequest()
  @Middlware.validateSchema(shortenedUrlsUpdate)
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { url } = req.body;
    const output = await this.factory.updateUrl.execute({
      id,
      url,
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

  async findByLink(req: Request, res: Response) {
    const { link } = req.params;
    const output = await this.factory.findUrlByLink.execute({ link });
    res.redirect(output.link);
  }
  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const output = await this.factory.findUrlById.execute({ id });
    res.send({
      message: "Sucesso",
      data: output,
    });
  }

  @Middlware.validateRequest()
  async findMany(req: Request, res: Response) {
    const user = Token.verify(req.headers.authorization?.split(" ")[1]!);
    if(!user?.id){
      res.send({
        error: true,
        message: "Token invalido",
      });
    }
    const output = await this.factory.findUrlMany.execute({ userId: user?.id! });
    res.send({
      message: "Sucesso",
      data: output,
    });
  }
}
