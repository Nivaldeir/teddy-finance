import { Token } from "../../src/core/domain/usecase/token";
describe("token", () => {
  const input = {
    username: "username",
    email: "email@teste.com.br",
    password: "password",
  };

  test("should return string", () => {
    const token = Token.generate(input);
    expect(token).toBeDefined()
  });
  test("should verify token", () => {
    const token = Token.generate(input);
    const verify = Token.verify(token);
    expect(verify?.email).toBe(input.email);
  });
  test("should return null for the token invalid", () => {
    const verify = Token.verify("token invalid");
    expect(verify).toBe(null);
  });
});
