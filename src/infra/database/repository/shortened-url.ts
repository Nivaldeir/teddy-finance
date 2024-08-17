import { IShortenedUrl } from "../../../core/app/repository/shortened-urls";
import { ShortenedUrl } from "../../../core/domain/entities/shortened-url";
import DatabaseConnection from "../DatabaseConnection";

export class ShortenedDatabase implements IShortenedUrl {
  constructor(private readonly db: DatabaseConnection<IShortenedUrl>) {}
  async findLink(link: string): Promise<ShortenedUrl> {
    const shorted = await this.db.query(
      "SELECT * FROM public.shortened_urls WHERE shorted = $1",
      [link]
    );
    if (shorted.length > 0) {
      await this.db.query(
        `UPDATE public.shortened_urls
         SET clicks_count = clicks_count + 1, updated_at = NOW()
         WHERE shorted = $1`,
        [link]
      );
      return new ShortenedUrl({
        clicks: shorted[0].clicks_count,
        link: shorted[0].link,
        sorted: shorted[0].shorted,
        id: shorted[0].id,
        userId: shorted[0].user_id,
        deletedAt: shorted[0].deleted_at,
        createdAt: shorted[0].created_at,
        updatedAt: shorted[0].updated_at,
      });
    }
    throw new Error("Link not found");
  }
  async create(data: ShortenedUrl): Promise<ShortenedUrl> {
    try {
      const values = [data.id, data.link, data.sorted, data.userId, 0];
      await this.db.query(
        `INSERT INTO public.shortened_urls (id, link, shorted, user_id, clicks_count)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *`,
        values
      );
      return data;
    } catch (error) {
      console.log("create", error);
      throw error;
    }
  }
  async update(data: ShortenedUrl): Promise<void> {
    try {
      await this.db.query(
        `
        UPDATE shortened_urls
        SET link = $2
        WHERE id = $1;
      `,
        [data.id, data.link]
      );
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const put = await this.db.query(
        "UPDATE public.shortened_urls SET deleted_at = NOW() WHERE id = $1",
        [id]
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findMany(userId: string): Promise<ShortenedUrl[]> {
    const shorteds = await this.db.query(
      "SELECT * FROM public.shortened_urls WHERE user_id = $1 AND deleted_at IS NULL",
      [userId]
    );
    return shorteds.map(
      (shorted: any) =>
        new ShortenedUrl({
          sorted: shorted.shorted,
          clicks: shorted.clicks_count,
          id: shorted.id,
          userId: shorted.user_id,
          link: shorted.link,
          deletedAt: shorted.deleted_at,
          createdAt: shorted.created_at,
          updatedAt: shorted.updated_at,
        })
    );
  }
  async findById(id: any): Promise<ShortenedUrl> {
    const [shorted] = await this.db.query(
      "SELECT * FROM public.shortened_urls WHERE id = $1",
      [id]
    );
    return new ShortenedUrl({
      sorted: shorted.shorted,
      clicks: shorted.clicks_count,
      id: shorted.id,
      userId: shorted.user_id,
      link: shorted.link,
      deletedAt: shorted.deleted_at,
    });
  }
}
