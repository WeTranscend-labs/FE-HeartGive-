import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FundFormData } from '@/schemas/fundFormSchema';

interface CampaignFieldsProps {
  form: UseFormReturn<FundFormData>;
}

export function CampaignFields({ form }: CampaignFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="purpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campaign Purpose</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the purpose of your campaign..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Explain how the funds will be used
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Amount (₳)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={100}
                step="0.01"
                {...field}
                onChange={(event) => field.onChange(+event.target.value)}
              />
            </FormControl>
            <FormDescription>Minimum ₳100, maximum ₳1,000,000</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...field}
              >
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Environment">Environment</option>
                <option value="Poverty">Poverty</option>
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Animal Welfare">Animal Welfare</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="Community Development">
                  Community Development
                </option>
                <option value="Children & Youth">Children & Youth</option>
                <option value="Elderly Care">Elderly Care</option>
              </select>
            </FormControl>
            <FormDescription>
              Select the category that best fits your campaign
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="walletAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Wallet Address</FormLabel>
            <FormControl>
              <Input placeholder="addr_..." {...field} />
            </FormControl>
            <FormDescription>
              Your Cardano wallet address for receiving funds
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
