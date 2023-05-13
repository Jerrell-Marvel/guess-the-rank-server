import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError("Token not provided");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string };
    req.userInfo = {
      userId: payload.id,
      username: payload.username,
    };
    next();
  } catch (err) {
    throw new UnauthorizedError("Invalid token");
  }
};
