import { NextFunction, Request, Response } from "express";

import { AddFoodInput, EditVendorInput, VendorLoginInput } from "../dto";

import { findVendor } from "./admin.controller";

import { generateSignature, validatePassword } from "../utility";

import { Food } from "../models";

export const vendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInput>req.body;

  const vendor = await findVendor({ email });

  if (!vendor) {
    return res.status(400).json({ message: "Login credentials are not valid" });
  }

  const passwordValidationResult = await validatePassword(
    password,
    vendor.password
  );

  if (passwordValidationResult === false) {
    return res.status(400).json({ message: "Login credentials are not valid" });
  }

  const signature = await generateSignature({
    _id: vendor._id,
    name: vendor.name,
    email: vendor.email,
    foodTypes: vendor.foodType,
  });

  res.json(signature);
};

export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    return res.json({ message: "Vendor is not found" });
  }

  const vendor = await findVendor({ id: user._id });

  res.json(vendor);
};

export const updateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, phone, foodTypes, address } = <EditVendorInput>req.body;
  const user = req.user;

  if (!user) {
    return res.json({ message: "Vendor is not found" });
  }

  const vendor = await findVendor({ id: user._id });

  if (!vendor) {
    return res.json({ message: "Vendor is not found" });
  }

  vendor.name = name;
  vendor.phone = phone;
  vendor.foodType = foodTypes;
  vendor.address = address;

  const updatedVendor = await vendor.save();

  res.json(updatedVendor);
};

export const updateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const files = <Express.Multer.File[]>req.files;

  if (!user) {
    return res.json({ message: "Vendor information not found" });
  }

  const vendor = await findVendor({ id: user._id });

  if (!vendor) {
    return res.json({ message: "Vendor information not found" });
  }

  const images = files?.map((file) => file.filename);

  vendor.coverImages.push(...images);

  const updatedVendor = await vendor.save();

  return res.json(updatedVendor);
};

export const updateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    return res.json({ message: "Vendor is not found" });
  }

  const vendor = await findVendor({ id: user._id });

  if (!vendor) {
    return res.json({ message: "Vendor is not found" });
  }

  vendor.serviceAvailability = !vendor.serviceAvailability;

  const updatedVendor = await vendor.save();

  res.json(updatedVendor);
};

export const addFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const files = <Express.Multer.File[]>req.files;
  const { name, category, description, foodType, price, readyTime } = <
    AddFoodInput
  >req.body;

  if (!user) {
    return res.json({ message: "Vendor information not found" });
  }

  const vendor = await findVendor({ id: user._id });

  if (!vendor) {
    return res.json({ message: "Vendor information not found" });
  }

  const images = files?.map((file) => file.filename);

  const addedFood = await Food.create({
    vendorId: vendor._id,
    name,
    description,
    category,
    foodType,
    readyTime,
    price,
    rating: 0,
    images,
  });

  vendor.foods.push(addedFood._id);

  const updatedVendor = await vendor.save();

  return res.json(updatedVendor);
};

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    return res.json({ message: "Vendor information not found" });
  }

  const vendor = await findVendor({ id: user._id });

  if (!vendor) {
    return res.json({ message: "Vendor information not found" });
  }

  const foods = await Food.find({ vendorId: vendor._id });

  res.json(foods);
};
