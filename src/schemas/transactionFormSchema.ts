import * as z from "zod";

export const transactionFormSchema = z.object({
  amount: z
    .number()
    .min(1, "Minimum amount is $1")
    .max(1000000, "Maximum amount is $1,000,000"),
  fromWallet: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address"),
});

export type TransactionFormData = z.infer<typeof transactionFormSchema>;
