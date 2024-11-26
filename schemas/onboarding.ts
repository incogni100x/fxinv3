import * as z from "zod";
export const AddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

export const IdentificationSchema = z.object({
  document_type: z.string().min(1, { message: "Document type is required" }),
  images: z
    .array(z.instanceof(File))
    .min(2, { message: "Minimum of 2 images are required" })
    .max(10, { message: "Maximum of 10 images are allowed" }),
});

export const InvestmentPlanSchema = z.object({
  investmentPlan: z.string().min(1, { message: "Please select an investment" }),
});
