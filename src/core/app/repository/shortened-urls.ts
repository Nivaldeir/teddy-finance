import { ShortenedUrl } from "../../domain/entities/shortened-url";

export interface IShortenedUrl {
  create(data: ShortenedUrl): Promise<ShortenedUrl>;
  update(data: ShortenedUrl): Promise<void>;
  delete(id: string): Promise<void>;
  findMany(userId: string): Promise<ShortenedUrl[]>;
  findLink(link: string): Promise<ShortenedUrl>;
  findById(params: any): Promise<ShortenedUrl>;
}
