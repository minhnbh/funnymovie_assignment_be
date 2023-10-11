import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/keys";

export function getToken(headers: any) {
  try {
    if ((headers && headers.authorization) || headers["x-access-token"]) {
      let token = headers.authorization || headers["x-access-token"];
      if (token.startsWith(`Bearer `)) {
        token = token.slice(7, token.length);
        return token;
      } else {
        return token;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function Authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string | null = getToken(req.headers);

    if (token) {
      const data: any = jwt.verify(token, JWT_SECRET);
      if (data._id) {
        Object.assign(res.locals, { userId: data._id });
      }

      return next();
    }

    res.status(401).json({ message: "Forbidden" });
  } catch (error) {
    return res.status(401).json({ message: "Forbidden" });
  }
}
