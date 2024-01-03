import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import IUser from "../types";
import User from "../models/user-model";

export interface authRequest extends Request {
    user: String;
    
}

export const authenicationMiddleware = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ error: "authorization is required" });
    }
    const token = authorization;
    const { _id } = jwt.verify(token, "express");
    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      req.user = existingUser.id;
    }
    next();
  } catch (error) {
    console.log("Error in authenicationMiddleware", error);
    res.status(401).send({ error: "Invalid token" });
  }
};