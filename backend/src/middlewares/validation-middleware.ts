import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

type DataType = 'body' | 'params';

export function validateData(
  schema: z.ZodObject<any, any> | z.ZodEffects<any, any>,
  dataType: DataType = 'body'
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[dataType]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: Record<string, string> = {};
        error.errors.forEach((error) => {
          errorMessages[error.path.join('.')] = error.message;
        });
        res
          .status(400)
          .json({ error: 'Dados inválidos', details: errorMessages });
      } else {
        res.sendStatus(500);
      }
    }
  };
}
