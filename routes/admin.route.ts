import { Router } from "express";

import { createVendor, getVendor, getVendors } from "../controllers";

const router = Router();

router.get("/vendors", getVendors);
router.post("/vendors", createVendor);

router.get("/vendors/:id", getVendor);

export { router as adminRoute };
