import { IUserRepository } from "../../../app/repository/user-repository";
import { Token } from "../token";

export class AuthUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: Input) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new Error(`User ${input.email} not found`);
    try {
      if (user.password.validate(input.password)) {
        const token = Token.generate({
          id: user.id,
          email: user.email.value,
          active: user.deletedAt ? false : true,
        });
        let userDto = {
          username: user.username,
          id: user.id,
          email: user.email.value,
        };
        return { token, user: userDto };
      }
      throw new Error(`User ${input.email} not authenticated`);
    } catch (error) {
      throw error;
    }
  }
}

type Input = {
  email: string;
  password: string;
};
