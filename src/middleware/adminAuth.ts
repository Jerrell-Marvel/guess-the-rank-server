import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import JWT from "jsonwebtoken";
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError("Token not provided");
  }

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET!) as { id: string; username: string; role: string };
    console.log(payload);

    if (payload.role !== "admin") {
      throw new UnauthorizedError("Invalid token");
    }

    req.userInfo = { ...payload };
    next();
  } catch (err) {
    throw new UnauthorizedError("Invalid token");
  }
};
