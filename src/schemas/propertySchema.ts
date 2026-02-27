import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  price: z.string().min(1, "Price is required").refine(
    (val) => Number(val) > 0,
    "Valid price is required"
  ),
  propertyType: z.string().min(1, "Property type is required"),
  intent: z.enum(["sale", "rent"]),
  rentPaymentPeriod: z.string().optional(),
  area: z.string().optional(),
  bedRooms: z.string().optional(),
  bathRooms: z.string().optional(),
  units: z.coerce.number().int().min(1).default(1),
  currency: z.string().min(1, "Currency is required"),
  postedBy: z.enum(["owner", "agent"]),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
