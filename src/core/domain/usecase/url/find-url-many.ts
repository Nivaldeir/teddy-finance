import { IShortenedUrl } from "../../../app/repository/shortened-urls";

export class FindUrlMany {
  constructor(private readonly shortnedUrl: IShortenedUrl) {}
  async execute(input: Input) {
    const link = await this.shortnedUrl.findMany(input.userId);
    return link;
  }
}
type Input = {
  userId: string;
};
