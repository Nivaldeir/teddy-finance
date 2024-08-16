import { IUserRepository } from "../../../core/app/repository/user-repository";
import { Email } from "../../../core/domain/entities/email";
import { Password } from "../../../core/domain/entities/password";
import { User } from "../../../core/domain/entities/user";
import DatabaseConnection from "../DatabaseConnection";

export class UserDatabase implements IUserRepository {
  constructor(private readonly db: DatabaseConnection<User>) {}
  async findById(id: string): Promise<User> {
    const [user] = await this.db.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (!user) {
      throw new Error("user not found");
    }
    return new User({
      deletedAt: user.deleted_at,
      email: new Email(user.email),
      id: user.id,
      password: new Password(user.password_hash, user.password_salt),
      username: user.username,
    });
  }
  async findByEmail(email: string): Promise<User> {
    const [user] = await this.db.query(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );
    if (!user) {
      throw new Error("user not found");
    }
    return new User({
      deletedAt: user.deleted_at,
      email: new Email(user.email),
      id: user.id,
      password: new Password(user.password_hash, user.password_salt),
      username: user.username,
    });
  }

  async create(data: User): Promise<User> {
    try {
      const userValues = [
        data.id,
        data.username,
        data.email.value,
        data.password.value,
        data.password.salt,
      ];
      await this.db.query(
        `INSERT INTO public.users (id, username, email, password_hash, password_salt) VALUES ($1, $2, $3, $4, $5)`,
        userValues
      );
      return data;
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }

  async update(data: User): Promise<void> {
    try {
      await this.db.query("BEGIN");
      await this.db.query(
        `
          INSERT INTO public.users (id, username, email, password_hash, password_salt) 
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (id) DO UPDATE 
          SET username = EXCLUDED.username, 
          email = EXCLUDED.email, 
          password_hash = EXCLUDED.password_hash, 
          password_salt = EXCLUDED.password_salt
      `,
        [
          data.id,
          data.username,
          data.email.value,
          data.password.value,
          data.password.salt,
        ]
      );
      await this.db.query("COMMIT");
    } catch (error) {
      await this.db.query("ROLLBACK");
      console.error("Error in create:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.query(
        "UPDATE public.users SET deleted_at = NOW() WHERE id = $1",
        [id]
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findMany(): Promise<any> {
    try {
      const users = (await this.db.query("SELECT * FROM public.users")) as any;
      return users.map(
        (user: any) =>
          new User({
            deletedAt: user.deleted_at,
            email: new Email(user.email),
            id: user.id,
            password: new Password(user.password_hash, user.password_salt),
            username: user.username,
          })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
