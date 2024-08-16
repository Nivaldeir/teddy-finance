import { ShortenedUrl } from "../../src/core/domain/entities/shortened-url";

describe("shortened_urls", () => {
  test("should create a instance of shortened_urls", () => {
    const link = ShortenedUrl.create({
      link: "http://google.com/",
    });
    expect(link.id).toBeDefined();
    expect(link.sorted).toBeDefined();
    expect(link.sorted.length).toBe(6);
  });
});
