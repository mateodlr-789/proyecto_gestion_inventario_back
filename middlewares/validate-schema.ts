import { NextFunction, Request, Response } from 'express';
import { AnySchema, ValidationError } from 'yup';

export const validateSchema =
  (schema: AnySchema, property: 'body' | 'params' | 'query' = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req[property] = await schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          success: false,
          message: 'Errors of validation',
          errors: err.errors,
        });
      }
      next(err);
    }
  };
