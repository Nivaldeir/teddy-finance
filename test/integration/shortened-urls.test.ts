import { randomUUID } from "crypto";
import { CreateUser } from "../../src/core/domain/usecase/user/create-user";
import { PgAdapter } from "../../src/infra/database/PgAdapter";
import { UserDatabase } from "../../src/infra/database/repository/user";
import { createTable } from "../config";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { IShortenedUrl } from "../../src/core/app/repository/shortened-urls";
import CreateUrl from "../../src/core/domain/usecase/url/create-url";
import { ShortenedDatabase } from "../../src/infra/database/repository/shortened-url";
import { UpdateUrl } from "../../src/core/domain/usecase/url/update-url";
import { FindUrlById } from "../../src/core/domain/usecase/url/find-url-by-id";
import { DeleteUrl } from "../../src/core/domain/usecase/url/delete-url";
import { FindUrlByLink } from "../../src/core/domain/usecase/url/find-url-by-link";
import { FindUrlMany } from "../../src/core/domain/usecase/url/find-url-many";

describe("User", () => {
  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: PgAdapter<IShortenedUrl>;
  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    postgresClient = new PgAdapter(postgresContainer.getConnectionUri());
    shortenedUrlRepository = new ShortenedDatabase(postgresClient);
    userRepository = new UserDatabase(postgresClient);

    await postgresClient.connect();
    await createTable(postgresClient);
  });

  let userRepository: UserDatabase;
  let shortenedUrlRepository: ShortenedDatabase;

  const createNewLink = async (userId?: string) => {
    const input = {
      link: `${randomUUID()}.com`,
      userId,
    };
    const createLink = new CreateUrl(shortenedUrlRepository);
    return await createLink.execute(input);
  };

  const createUser = async () => {
    const input = {
      email: `${randomUUID()}test@example.com`,
      password: `password`,
      username: `${randomUUID()}-nivaldeir`,
    };
    const createUserUseCase = new CreateUser(userRepository);
    return await createUserUseCase.execute(input);
  };

  test("should create a new link with user anonymous", async () => {
    const response = await createNewLink();
    expect(response.sorted).toBeDefined();
  });

  test("should return links the user", async () => {
    const user = await createUser();
    await createNewLink(user.id);
    await createNewLink(user.id);
    const findMay = new FindUrlMany(shortenedUrlRepository);
    const output = await findMay.execute({ userId: user.id });
    expect(output[0].id).toBeDefined();
  });
  test("should return links the user with link count +1 ", async () => {
    const user = await createUser();
    const link1 = await createNewLink(user.id);
    const link2 = await createNewLink(user.id);
    const getByLink = new FindUrlByLink(shortenedUrlRepository);
    await getByLink.execute({ link: link1.sorted });
    await getByLink.execute({ link: link2.sorted });
    const findMay = new FindUrlMany(shortenedUrlRepository);
    const output = await findMay.execute({ userId: user.id });
    expect(output[0].clicks).toBe(1);
    expect(output[1].clicks).toBe(1);
  });
  test("should return link", async () => {
    const user = await createUser();
    const response = await createNewLink(user.id);
    const getLink = new FindUrlByLink(shortenedUrlRepository);
    const link = getLink.execute({ link: response.sorted });
    expect(link).toBeDefined();
  });
  test("should update a link from the user", async () => {
    const user = await createUser();
    const response = await createNewLink(user.id);
    const updateLink = new UpdateUrl(shortenedUrlRepository);
    await updateLink.execute({
      id: response.id,
      url: "new URL",
    });
    const findUrl = new FindUrlById(shortenedUrlRepository);
    const url = await findUrl.execute({ id: response.id });
    expect(url.id).toBe(response.id);
    expect(url.link).toBe("new URL");
  });

  test("should delete a link from the user", async () => {
    const response = await createNewLink();
    const deleteUrl = new DeleteUrl(shortenedUrlRepository);
    await deleteUrl.execute({ id: response.id });
    const findUrl = new FindUrlById(shortenedUrlRepository);
    const link = await findUrl.execute({ id: response.id });
    expect(link.deletedAt).toBeDefined();
  });
});
