
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Validation error',
      details: error.errors
    });
    // Return next() to satisfy TypeScript's return type requirements
    return next();
  }
};
