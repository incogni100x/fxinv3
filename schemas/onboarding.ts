import * as z from "zod";
export const AddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  postal_code: z.string().min(1, "Postal code is required"),
});
