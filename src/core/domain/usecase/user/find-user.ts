import { IUserRepository } from "../../../app/repository/user-repository";
import { User } from "../../entities/user";

export class FindUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: Input): Promise<User> {
    try {
      const output = await this.userRepository.findById(input.id);
      return output;
    } catch (error) {
      throw error;
    }
  }
}
type Input = {
  id: string;
};
