import { IUserRepository } from "../../../app/repository/user-repository";
import { User } from "../../entities/user";
export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: Input): Promise<Ouput> {
    const user = User.create({ ...input });
    const output = await this.userRepository.create(user);
    return {
      deleteAt: output.deletedAt,
      email: output.email.value,
      id: output.id,
      username: output.username,
    };
  }
}

type Input = {
  email: string;
  password: string;
  username: string;
};
type Ouput = {
  deleteAt?: Date | null;
  email: string;
  id: string;
  username?: string;
};
