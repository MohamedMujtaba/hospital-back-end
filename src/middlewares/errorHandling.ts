import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject, ZodError, ZodType } from "zod";
import { fromZodError } from "zod-validation-error";

//  FIXME: / TODO: add validation to params and query

export const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      const validationError = fromZodError(error as ZodError);
      return res.status(400).json(validationError.message);
    }
  };

// const validate =
//   (schema: AnyZodObject) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         // query: req.query,
//         // params: req.params,
//       });
//       return next();
//     } catch (error) {
//       return res.status(400).json(error);
//     }
//   };
