import { IUserRepository } from "../../../app/repository/user-repository";

export class DeleteUser {
  constructor(private readonly userRepository: IUserRepository){}
  async execute(input:Input){
    await this.userRepository.delete(input.id)
  }
}

type Input = {
  id:string;
}