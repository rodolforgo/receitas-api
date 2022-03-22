export class CustomError extends Error {
    constructor(
        public statusCode: number = 500,
        public message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}