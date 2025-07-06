import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const zodValidate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    req.body = result.data;
    next();
  };

export const validateParams = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }
    req.params = result.data;
    next();
  };
};
