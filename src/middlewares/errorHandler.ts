import { Request, Response, NextFunction } from 'express';
import {
    ValidationError,
    DuplicateEntryError,
    PrimaryKeyEntryError,
    ForeignKeyEntryError,
    BadRequestError,
    MethodNotAllowedError,
    UnsupportedMediaTypeError,
    RateLimitExceededError,
    InternalServerError,
    BadGatewayError,
    ServiceUnavailableError,
    GatewayTimeoutError,
} from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';

const errorHandler = (
    error: Error,
    _req: Request, // Aunque no se utilice, es parte de la firma del middleware.
    res: Response,
    _next: NextFunction, // Aunque no se utilice, es parte de la firma del middleware.
) => {
    if (error instanceof ValidationError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof DuplicateEntryError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (
        error instanceof PrimaryKeyEntryError ||
        error instanceof ForeignKeyEntryError
    ) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof BadRequestError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof MethodNotAllowedError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof UnsupportedMediaTypeError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof RateLimitExceededError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof InternalServerError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof BadGatewayError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof ServiceUnavailableError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    if (error instanceof GatewayTimeoutError) {
        return resultHandler(
            { status: error.statusCode, success: false, result: error.message },
            res,
        );
    }

    // Error genérico en caso de que no coincida con ningún tipo específico
    if (!res.headersSent) {
        return resultHandler(
            {
                status: 500,
                success: false,
                result: 'Error interno del servidor',
            },
            res,
        );
    }
};

export default errorHandler;
