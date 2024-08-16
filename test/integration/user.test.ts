import { randomUUID } from "crypto";
import { Token } from "../../src/core/domain/usecase/token";
import { AuthUser } from "../../src/core/domain/usecase/user/auth-user";
import { CreateUser } from "../../src/core/domain/usecase/user/create-user";
import { DeleteUser } from "../../src/core/domain/usecase/user/delete-user";
import { FindManyUser } from "../../src/core/domain/usecase/user/find-many-user";
import { FindUser } from "../../src/core/domain/usecase/user/find-user";
import { UpdateUser } from "../../src/core/domain/usecase/user/update-user";
import { PgAdapter } from "../../src/infra/database/PgAdapter";
import { UserDatabase } from "../../src/infra/database/repository/user";
import { createTable } from "../config";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

describe("User", () => {
  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: PgAdapter<UserDatabase>;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    postgresClient = new PgAdapter(postgresContainer.getConnectionUri());
    userRepository = new UserDatabase(postgresClient);

    await postgresClient.connect();
    await createTable(postgresClient);
  });

  let userRepository: UserDatabase;

  const createUser = async () => {
    const input = {
      email: `${randomUUID()}test@example.com`,
      password: `password`,
      username: `${randomUUID()}-nivaldeir`,
    };
    const createUserUseCase = new CreateUser(userRepository);
    return await createUserUseCase.execute(input);
  };

  test("should create a new user", async () => {
    const newUser = await createUser();
    const findUserUseCase = new FindUser(userRepository);
    const user = await findUserUseCase.execute({ id: newUser.id });

    expect(user.email.value).toBe(newUser.email);
    expect(user.id).toBeDefined();
    expect(1).toBe(1);
  });

  test("should return users", async () => {
    const findUserUseCase = new FindManyUser(userRepository);
    const user = await findUserUseCase.execute();
    expect(user[0].email).toBeDefined();
    expect(user[0].id).toBeDefined();
    expect(user[0].username).toBeDefined();
  });

  test("should update a user", async () => {
    const newUser = await createUser();
    const updateUserUseCase = new UpdateUser(userRepository);
    await updateUserUseCase.execute({
      id: newUser.id,
      password: "update",
    });
    const findUserUseCase = new FindUser(userRepository);
    const user = await findUserUseCase.execute({ id: newUser.id });

    expect(user.password.validate("update")).toBeTruthy();
  });

  test("should delete a user", async () => {
    const newUser = await createUser();
    const deleteUserUseCase = new DeleteUser(userRepository);
    await deleteUserUseCase.execute({ id: newUser.id });
    const findUserUseCase = new FindUser(userRepository);
    const response = await findUserUseCase.execute({ id: newUser.id });
    expect(response.deletedAt).toBeDefined();
  });

  test("should authenticate a user", async () => {
    const newUser = await createUser();
    const authUserUseCase = new AuthUser(userRepository);
    const output = await authUserUseCase.execute({
      email: newUser.email,
      password: "password",    
    });
    const isValid = Token.verify(output.token);
    expect(isValid).toBeTruthy();
  });

  test("should throw an error on authentication failure", async () => {
    const newUser = await createUser();
    const authUserUseCase = new AuthUser(userRepository);
    await expect(
      authUserUseCase.execute({
        email: newUser.email,
        password: "password_incorrect",
      })
    ).rejects.toThrow(`User ${newUser.email} not authenticated`);
  });
});
