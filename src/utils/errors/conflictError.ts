export class ConflictError extends Error {
    readonly statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}  