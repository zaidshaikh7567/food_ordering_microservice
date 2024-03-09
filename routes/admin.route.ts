import { Router, Request, Response, NextFunction } from "express";

import { createVendor, getVendor, getVendors } from "../controllers";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from admin" });
});

router.get("/vendors", getVendors);
router.post("/vendors", createVendor);

router.get("/vendors/:id", getVendor);

export { router as adminRoute };
