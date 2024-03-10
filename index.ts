import path from "path";
import express from "express";
import mongoose from "mongoose";

import { MONGO_URI } from "./config";

import { adminRoute, vendorRoute } from "./routes";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error: any) => {
    console.error("Error", error);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/admins", adminRoute);
app.use("/vendors", vendorRoute);

app.listen(8000, () => {
  console.clear();
  console.log("App is listening to the port 8000");
});
