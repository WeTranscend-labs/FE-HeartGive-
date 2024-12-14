import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFundStore } from '../store/useFundStore';
import { motion } from 'framer-motion';
import { useContext } from 'react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  transactionFormSchema,
  type TransactionFormData,
} from '../schemas/transactionFormSchema';
import { useToast } from '@/hooks/use-toast';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import SmartContractContext from '@/contexts/components/SmartContractContext';
import LucidContext from '@/contexts/components/LucidContext';
import WalletContext from '@/contexts/components/WalletContext';
import { WalletContextType } from '@/types/contexts/WalletContextType';

interface TransactionFormProps {
  fundAddress: string;
  onSuccess: () => void;
}

export function TransactionForm({
  fundAddress,
  onSuccess,
}: TransactionFormProps) {
  const { toast } = useToast();
  const { contribute } =
    useContext<SmartContractContextType>(SmartContractContext);
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const { wallet } = useContext<WalletContextType>(WalletContext);

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 1,
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    try {
      // Kiểm tra kết nối Lucid
      if (!lucid) {
        throw new Error('Please connect your wallet first');
      }

      const adaAmount = data.amount;
      const lovelaceAmount = BigInt(adaAmount) * 1_000_000n;

      console.log(adaAmount);

      // Gọi hàm contribute
      const txHash = await contribute({
        fundAddress,
        contributionAmount: lovelaceAmount,
        fundOwner: wallet.publicKeyHash,
      });

      // console.log(txHash);

      // Hiển thị toast thành công
      toast({
        title: 'Contribution Successful',
        description: `You've contributed ${data.amount} ₳ to the campaign.`,
        variant: 'success',
      });

      // Call onSuccess to close the modal
      onSuccess();

      // Reset form sau khi contribute thành công
      form.reset();
    } catch (error) {
      // Xử lý các lỗi có thể xảy ra
      console.error('Contribution error:', error);

      toast({
        title: 'Contribution Failed',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Contribute to Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₳)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₳</span>
                        </div>
                        <Input
                          type="number"
                          min={1}
                          step="0.01"
                          className="pl-7"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the amount you wish to contribute
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Contribute'
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </CardContent>
    </Card>
  );
}