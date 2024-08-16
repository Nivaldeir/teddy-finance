import * as jwt from "jsonwebtoken";
export class Token {
  static generate(params: object) {
    const token = jwt.sign(params, process.env.JWT_SECRET || "123456789", {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    return token;
  }
  static verify(token: string): Output | null {
    try {
      const valid = jwt.verify(
        token,
        process.env.JWT_SECRET || "123456789"
      ) as Output;
      return valid;
    } catch (e) {
      return null;
    }
  }
}

type Output = {
  id?: string;
  email: string;
  active: boolean;
  iat: number;
  exp: number;
};
