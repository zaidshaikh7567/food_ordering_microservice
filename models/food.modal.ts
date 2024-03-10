import { model, Schema, Document } from "mongoose";

interface FoodDoc extends Document {
  vendorId: Schema.Types.ObjectId;
  name: string;
  category: string;
  description: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: string[];
}

const foodSchema = new Schema(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String, required: true },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number, required: true },
    rating: { type: Number },
    images: { type: [String] },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.__v;
        delete ret.updatedAt;
      },
    },
  }
);

export const Food = model<FoodDoc>("Food", foodSchema);
