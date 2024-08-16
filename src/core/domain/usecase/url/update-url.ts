import { IShortenedUrl } from "../../../app/repository/shortened-urls";

export class UpdateUrl {
  constructor(private readonly shortnedUrl: IShortenedUrl) {}
  async execute(input: Input) {
    const shortenedUrl = await this.shortnedUrl.findById(input.id);
    shortenedUrl.link = input.url;
    await this.shortnedUrl.update(shortenedUrl);
  }
}
type Input = {
  id: string;
  url: string;
};
