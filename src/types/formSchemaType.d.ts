import * as z from 'zod';

export const formSchema = z.object({
  organizationName: z
    .string()
    .min(3, 'Organization name must be at least 3 characters')
    .max(100, 'Organization name must be less than 100 characters'),
  startDate: z.date('Invalid start date'),
  endDate: z.date('Invalid end date'),
  image: z.string().url('Invalid image URL'),
  organizationInfo: z.object({
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z.object({
      facebook: z
        .string()
        .url('Invalid Facebook URL')
        .optional()
        .or(z.literal('')),
      twitter: z
        .string()
        .url('Invalid Twitter URL')
        .optional()
        .or(z.literal('')),
      instagram: z
        .string()
        .url('Invalid Instagram URL')
        .optional()
        .or(z.literal('')),
      linkedin: z
        .string()
        .url('Invalid LinkedIn URL')
        .optional()
        .or(z.literal('')),
    }),
  }),
  purpose: z
    .string()
    .min(50, 'Purpose must be at least 50 characters')
    .max(1000, 'Purpose must be less than 1000 characters'),
  targetAmount: z
    .number()
    .min(100, 'Minimum amount is 100 ADA')
    .max(1000000, 'Maximum amount is 1,000,000 ADA'),
  walletAddress: z
    .string()
    .regex(/^addr1[a-zA-Z0-9]{98}$/, 'Invalid Cardano wallet address'),
  category: z.enum(
    [
      'Education',
      'Healthcare',
      'Environment',
      'Poverty',
      'Disaster Relief',
      'Animal Welfare',
      'Arts & Culture',
      'Community Development',
      'Children & Youth',
      'Elderly Care',
    ],
    {
      required_error: 'Please select a category',
    }
  ),
  tags: z.array(z.string()).optional(),
});

export type FundFormData = z.infer<typeof formSchema>;
