export class HttpError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends HttpError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export class BadRequestError extends HttpError {
    constructor(message = 'Invalid request') {
        super(message, 400);
    }
}

export class DuplicateItem extends HttpError {
    constructor(message = 'Item alredy exist'){
        super(message, 409);
    }
}

export class InternalServerError extends HttpError {
    constructor(message = 'Internal server error') {
        super(message, 500);
    }
}
