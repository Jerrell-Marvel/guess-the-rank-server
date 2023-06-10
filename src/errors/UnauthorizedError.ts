export class UnauthorizedError extends Error {
  statusCode: number;
  name = "UnauthorizedError";
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}
