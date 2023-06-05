import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  statusCode: number;
  name = "NotFoundError";
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
