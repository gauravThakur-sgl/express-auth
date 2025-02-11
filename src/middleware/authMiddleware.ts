import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

interface DecodedToken {
  sub: string;
  exp: number;
}
export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_Secret Not Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    if (Date.now() > decoded.exp * 1000) {
      res.sendStatus(401);
      return;
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.sendStatus(401).json({ message: "User not Found" });
    } else {
      req.user = user;
    }

    next();
  } catch (error: any) {
    console.error(`Error while checking for authentication`, error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};
