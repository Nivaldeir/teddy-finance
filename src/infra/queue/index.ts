import { CasesFactory } from "../../core/app/factory/cases-factory";
import Injectable from "../di/Injectable";
import IQueue from "./queue";

export default class {
  @Injectable("factory_usecases")
  factory: CasesFactory;
  constructor(readonly queue: IQueue) {
    queue.consume("create-user", async (input: InputCreateUser) => {
      await this.factory.createUser.execute({
        email: input.email,
        password: input.password,
      });
    });
    queue.consume("create-link", async (input: InputCreateLink) => {
      await this.factory.createUrl.execute({
        link: input.link,
        userId: input.userId,
      });
    });
  }
}

type InputCreateLink = {
  userId: string;
  link: string;
};

type InputCreateUser = {
  email: string;
  password: string;
  username?: string;
};
