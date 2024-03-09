import { Request, Response, NextFunction } from "express";

import { CreateVendorInput } from "../dto";

import { Vendor } from "../models";

import { generatePasswordHash, generatePasswordHashSalt } from "../utility";

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    email,
    phone,
    foodType,
    address,
    pincode,
    password,
  } = <CreateVendorInput>req.body;

  const existingVendor = await Vendor.findOne({ email });

  if (existingVendor) {
    return res.json({ message: "A vendor is exist with this email" });
  }

  const passwordHashSalt = await generatePasswordHashSalt(10);
  const hashedPassword = await generatePasswordHash(password, passwordHashSalt);

  const createdVendor = await Vendor.create({
    name,
    ownerName,
    email,
    phone,
    foodType,
    address,
    pincode,
    password: hashedPassword,
    salt: passwordHashSalt,
    rating: 0,
    serviceAvailability: false,
    coverImages: [],
  });

  res.json(createdVendor);
};

export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "All vendors" });
};

export const getVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Single vendors" });
};
