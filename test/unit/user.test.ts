import { User } from "../../src/core/domain/entities/user";

describe("user", () => {
  const input = {
    username: "username",
    email: "email@teste.com.br",
    password: "password",
  };

  test("should create a instance of user", () => {
    const userAuthentication = User.create({
      username: input.username,
      email: input.email,
      password: input.password,
    });
    expect(userAuthentication.id).toBeDefined();
    expect(userAuthentication.email.value).toBe(input.email);
    expect(userAuthentication.password.value).toBeDefined();
  });
});
