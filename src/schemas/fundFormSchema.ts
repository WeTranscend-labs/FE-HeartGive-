import * as z from 'zod';

export const fundFormSchema = z.object({
  organizationName: z
    .string()
    .min(3, 'Organization name must be at least 3 characters')
    .max(100, 'Organization name must be less than 100 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  image: z.string().min(1, 'Image is required'),
  organizationInfo: z.object({
    socialInfo: z.object({
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
      phone: z.string().optional(),
      email: z.string().email('Invalid email address'),
    }),
  }),
  purpose: z
    .string()
    .min(50, 'Purpose must be at least 50 characters')
    .max(1000, 'Purpose must be less than 1000 characters'),
  targetAmount: z
    .number()
    .min(100, 'Minimum amount is $100')
    .max(1000000, 'Maximum amount is $1,000,000'),
  walletAddress: z
    .string()
    .regex(/^addr_test1[a-z0-9]+$/, 'Invalid Cardano wallet address'),
  fundAddress: z.string(),
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
});

export type FundFormData = z.infer<typeof fundFormSchema>;
