import { IShortenedUrl } from "../../../app/repository/shortened-urls";

export class FindUrlByLink {
  constructor(private readonly shortnedUrl: IShortenedUrl) {}
  async execute(input: Input) {
    const link = await this.shortnedUrl.findLink(input.link);
    return link;
  }
}
type Input = {
  link: string;
};
