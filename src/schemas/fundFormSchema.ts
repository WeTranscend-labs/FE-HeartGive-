import * as z from "zod";
import { FundCategory } from "../types/fund";

export const fundFormSchema = z.object({
  organizationName: z
    .string()
    .min(3, "Organization name must be at least 3 characters")
    .max(100, "Organization name must be less than 100 characters"),
  organizationInfo: z.object({
    description: z
      .string()
      .min(100, "Description must be at least 100 characters")
      .max(1000, "Description must be less than 1000 characters"),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z.object({
      facebook: z
        .string()
        .url("Invalid Facebook URL")
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .url("Invalid Twitter URL")
        .optional()
        .or(z.literal("")),
      instagram: z
        .string()
        .url("Invalid Instagram URL")
        .optional()
        .or(z.literal("")),
      linkedin: z
        .string()
        .url("Invalid LinkedIn URL")
        .optional()
        .or(z.literal("")),
    }),
  }),
  purpose: z
    .string()
    .min(50, "Purpose must be at least 50 characters")
    .max(1000, "Purpose must be less than 1000 characters"),
  targetAmount: z
    .number()
    .min(100, "Minimum amount is $100")
    .max(1000000, "Maximum amount is $1,000,000"),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address"),
  category: z.enum(
    [
      "Education",
      "Healthcare",
      "Environment",
      "Poverty",
      "Disaster Relief",
      "Animal Welfare",
      "Arts & Culture",
      "Community Development",
      "Children & Youth",
      "Elderly Care",
    ],
    {
      required_error: "Please select a category",
    }
  ),
  tags: z.array(z.string()).optional(),
});

export type FundFormData = z.infer<typeof fundFormSchema>;
