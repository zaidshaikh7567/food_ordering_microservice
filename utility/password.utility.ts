import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request } from "express";

import { VendorPayload, AuthPayload } from "../dto";

import { APP_SECRET } from "../config";

export const generatePasswordHashSalt = async (salt: number) =>
  await bcrypt.genSalt(salt);

export const generatePasswordHash = async (
  password: string,
  passwordHashSalt: string
) => await bcrypt.hash(password, passwordHashSalt);

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => await bcrypt.compare(password, hashedPassword);

export const generateSignature = async (payload: VendorPayload) =>
  jwt.sign(payload, APP_SECRET, { expiresIn: "1h" });

export const validateSignature = async (req: Request) => {
  const signature = req.get("Authorization");

  if (!signature) {
    return false;
  }

  const payload = (await jwt.verify(
    signature.split(" ")[1],
    APP_SECRET
  )) as AuthPayload;

  req.user = payload;

  return true;
};
