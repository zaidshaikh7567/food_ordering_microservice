import { NextFunction, Request, Response } from "express";

import { validateSignature } from "../utility";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = await validateSignature(req);

  if (validationResult === false) {
    return res.json({ message: "User is not authorized" });
  }

  next();
};
