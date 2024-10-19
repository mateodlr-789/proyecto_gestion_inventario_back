// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helpers/http-errors';
import { ValidationError } from 'sequelize';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`Error: ${err.message || 'Error desconocido'}`);
    console.error(`Ruta: ${req.method} ${req.originalUrl}`);

    let statusCode = 500; 
    let message = 'Ocurrió un error en el servidor. Por favor, contacte al administrador.';

    if (err instanceof HttpError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof ValidationError) {
        statusCode = 400;
        message = 'Error de validación: ' + err.errors.map(e => e.message).join(', ');
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Solo en modo dev
    });
};
