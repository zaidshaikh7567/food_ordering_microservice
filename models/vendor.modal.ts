import { model, Schema, Document, Model } from "mongoose";

interface VendorDoc extends Document {
  name: string;
  ownerName: String;
  email: string;
  phone: string;
  foodType: [string];
  address: string;
  pincode: string;
  password: string;
  salt: string;
  serviceAvailability: boolean;
  coverImages: [string];
  rating: number;
  // foods: [Schema.Types.ObjectId];
}

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    foodType: { type: [String] },
    address: { type: String },
    pincode: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailability: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    // foods: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);

export const Vendor = model<VendorDoc>("Vendor", vendorSchema);
