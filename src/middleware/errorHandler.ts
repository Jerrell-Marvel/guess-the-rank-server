import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(JSON.stringify(err));
  let customError = {
    success: false,
    name: err.name || "Internal server error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  if (err.code === 11000 || err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // return res.json(err);
  // next(err);
  return res.status(customError.statusCode).json(customError);
};
