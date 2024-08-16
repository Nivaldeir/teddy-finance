import { IShortenedUrl } from "../../../app/repository/shortened-urls";
import { ShortenedUrl } from "../../entities/shortened-url";

export default class CreateUrl {
  constructor(private readonly urlRepository: IShortenedUrl) {}
  async execute(input: Input) {
    const link = ShortenedUrl.create({
      link: input.link,
      userId: input.userId,
    });
    const output = await this.urlRepository.create(link);
    return {
      clicks: output.clicks,
      id: output.id,
      url: output.link,
      sorted: output.sorted
    }
  }
}

type Input = {
  link: string;
  userId?: string;
};
