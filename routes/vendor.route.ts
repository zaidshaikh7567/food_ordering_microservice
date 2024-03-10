import { Router } from "express";

import {
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from "../controllers/vendor.controller";

import { authenticate } from "../middlewares";

const router = Router();

router.post("/login", vendorLogin);

router.use(authenticate);
router.get("/profile", getVendorProfile);
router.patch("/profile", updateVendorProfile);
router.patch("/service", updateVendorService);

export { router as vendorRoute };
