import { randomUUID } from "crypto";
import { Email } from "./email";
import { Password } from "./password";

type IUser = {
  id: string;
  username?: string;
  email: Email;
  password: Password;
  deletedAt: Date | null;
};

type IUserCreate = {
  username?: string;
  email: string;
  password: string;
};

export class User {
  id: string;
  username?: string;
  email: Email;
  password: Password;
  deletedAt: Date | null;

  constructor(props: IUser) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.deletedAt = props.deletedAt;
  }
  static create(props: Omit<IUserCreate, "id">): User {
    const id = randomUUID();
    return new User({
      id: id,
      email: new Email(props.email),
      password: Password.create(props.password),
      username: props.username,
      deletedAt: null,
    });
  }
}
