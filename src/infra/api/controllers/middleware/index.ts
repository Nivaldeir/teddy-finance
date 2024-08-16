import { AnyZodObject, ZodError } from "zod";
import Injectable from "../../../di/Injectable";
import { ICache } from "../../../cache/ICache";
import { Token } from "../../../../core/domain/usecase/token";
import { CasesFactory } from "../../../../core/app/factory/cases-factory";
export default class Middlware {
  @Injectable("cache")
  private static cache: ICache;

  @Injectable("factory_usecases")
  static factory: CasesFactory;
  static validateRequest() {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      descriptor.value = async function (req: any, res: any, next: any) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(403).send({ error: "Token invalido" });
        }
        let validToken = Token.verify(token) as any;
        if (!validToken) res.status(403).send({ error: "Token invalido" });
        originalMethod.call(this, req, res, next);
      };
    };
  }
  static validateSchema(schema: AnyZodObject) {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      const originalMethod = descriptor.value;
      descriptor.value = async function (req: any, res: any, next: any) {
        try {
          await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
          });
          return originalMethod.call(this, req, res, next);
        } catch (error: ZodError | any) {
          const validationErrors = error.errors.map((err: any) => {
            return {
              field: err.path[1],
              message: err.message,
            };
          });
          res.status(401).json({
            message: "Erro de validação",
            errors: validationErrors,
          });
          return;
        }
      };
    };
  }
}
