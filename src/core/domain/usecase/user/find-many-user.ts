import { IUserRepository } from "../../../app/repository/user-repository";

export class FindManyUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(): Promise<Ouput[]> {
    const users = await this.userRepository.findMany();
    return users.map((user) => ({
      deleteAt: user.deletedAt,
      email: user.email.value,
      id: user.id,
      username: user.username,
    }));
  }
}

type Ouput = {
  deleteAt: Date | null;
  email: string;
  id: string;
  username?: string;
};
