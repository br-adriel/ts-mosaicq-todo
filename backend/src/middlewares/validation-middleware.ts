import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
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
