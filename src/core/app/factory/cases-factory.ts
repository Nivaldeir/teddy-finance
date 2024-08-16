import { PgAdapter } from "../../../infra/database/PgAdapter";
import { ShortenedDatabase } from "../../../infra/database/repository/shortened-url";
import { UserDatabase } from "../../../infra/database/repository/user";
import CreateUrl from "../../domain/usecase/url/create-url";
import { DeleteUrl } from "../../domain/usecase/url/delete-url";
import { FindUrlById } from "../../domain/usecase/url/find-url-by-id";
import { FindUrlByLink } from "../../domain/usecase/url/find-url-by-link";
import { FindUrlMany } from "../../domain/usecase/url/find-url-many";
import { UpdateUrl } from "../../domain/usecase/url/update-url";
import { AuthUser } from "../../domain/usecase/user/auth-user";
import { CreateUser } from "../../domain/usecase/user/create-user";
import { DeleteUser } from "../../domain/usecase/user/delete-user";
import { FindManyUser } from "../../domain/usecase/user/find-many-user";
import { FindUser } from "../../domain/usecase/user/find-user";
import { UpdateUser } from "../../domain/usecase/user/update-user";

export class CasesFactory {
  private static db = new PgAdapter(
    `postgresql://${process.env.WSRS_DATABASE_USER}:${process.env.WSRS_DATABASE_PASSWORD}@${process.env.WSRS_DATABASE_HOST}:${process.env.WSRS_DATABASE_PORT}/${process.env.WSRS_DATABASE_NAME}`
  );
  private static userRepositoryDatabase = new UserDatabase(this.db);
  private static shortenedRepositoryDatabase = new ShortenedDatabase(this.db);
  constructor(
    readonly createUser: CreateUser,
    readonly deleteUser: DeleteUser,
    readonly findUser: FindUser,
    readonly updateUser: UpdateUser,
    readonly findManyUsers: FindManyUser,
    readonly authUser: AuthUser,
    readonly createUrl: CreateUrl,
    readonly deleteUrl: DeleteUrl,
    readonly findUrlById: FindUrlById,
    readonly updateUrl: UpdateUrl,
    readonly findUrlMany: FindUrlMany,
    readonly findUrlByLink: FindUrlByLink
  ) {}

  static create(): CasesFactory {
    const authUser = new AuthUser(this.userRepositoryDatabase);

    const createUser = new CreateUser(this.userRepositoryDatabase);
    const deleteUser = new DeleteUser(this.userRepositoryDatabase);
    const findUser = new FindUser(this.userRepositoryDatabase);
    const updateUser = new UpdateUser(this.userRepositoryDatabase);
    const findManyUser = new FindManyUser(this.userRepositoryDatabase);

    const createUrl = new CreateUrl(this.shortenedRepositoryDatabase);
    const deleteUrl = new DeleteUrl(this.shortenedRepositoryDatabase);
    const findUrlById = new FindUrlById(this.shortenedRepositoryDatabase);
    const updateUrl = new UpdateUrl(this.shortenedRepositoryDatabase);
    const findUrlMany = new FindUrlMany(this.shortenedRepositoryDatabase);
    const findUrlByLink = new FindUrlByLink(this.shortenedRepositoryDatabase);

    return new CasesFactory(
      createUser,
      deleteUser,
      findUser,
      updateUser,
      findManyUser,
      authUser,
      createUrl,
      deleteUrl,
      findUrlById,
      updateUrl,
      findUrlMany,
      findUrlByLink
    );
  }
}
