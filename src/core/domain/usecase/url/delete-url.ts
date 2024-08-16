import { IShortenedUrl } from "../../../app/repository/shortened-urls";

export class DeleteUrl {
  constructor(private readonly shortnedUrl: IShortenedUrl) {}
  async execute(input: Input) {
    await this.shortnedUrl.delete(input.id);
  }
}
type Input = {
  id: string;
};
