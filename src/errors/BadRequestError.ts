import { StatusCodes } from "http-status-codes";
export class BadRequestError extends Error {
  statusCode: number;
  name = "BadRequestError";
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
