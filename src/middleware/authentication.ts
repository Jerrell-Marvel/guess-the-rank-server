import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError("Token not provided");
  }

  // console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; username: string; role: "admin" | "user" };

    console.log(payload);
    req.userInfo = { ...payload };
    next();
  } catch (err) {
    throw new UnauthorizedError("Invalid token");
  }
};
