export interface CreateVendorInput {
  name: string;
  ownerName: String;
  email: string;
  phone: string;
  foodType: string[];
  address: string;
  pincode: string;
  password: string;
}

export interface VendorLoginInput {
  email: string;
  password: string;
}

export interface VendorPayload {
  _id: string;
  name: string;
  email: string;
  foodTypes: string[];
}

export interface EditVendorInput {
  name: string;
  phone: string;
  foodTypes: string[];
  address: string;
}
