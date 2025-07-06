import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const zodValidate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data; // Validated & parsed
    next();
  };
