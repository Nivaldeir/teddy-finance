import { IShortenedUrl } from "../../../app/repository/shortened-urls";

export class FindUrlById {
  constructor(private readonly shortnedUrl: IShortenedUrl) {}
  async execute(input: Input) {
    const link = await this.shortnedUrl.findById(input.id);
    return link
  }
}
type Input = {
  id: string;
};
