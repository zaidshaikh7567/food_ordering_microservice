import multer from "multer";
import { Router } from "express";

import {
  addFood,
  getFoods,
  getVendorProfile,
  updateVendorCoverImage,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from "../controllers";

import { authenticate } from "../middlewares";

const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images");
  },
  filename(req, file, cb) {
    cb(null, `${new Date().toISOString()}_${file.originalname}`);
  },
});

const imageUploadHandler = multer({ storage: imageStorage }).array(
  "images",
  10
);

const router = Router();

router.post("/login", vendorLogin);

router.use(authenticate);
router.get("/profile", getVendorProfile);
router.patch("/profile", updateVendorProfile);
router.patch("/coverImage", imageUploadHandler, updateVendorCoverImage);
router.patch("/service", updateVendorService);

router.post("/food", imageUploadHandler, addFood);
router.get("/foods", getFoods);

export { router as vendorRoute };
