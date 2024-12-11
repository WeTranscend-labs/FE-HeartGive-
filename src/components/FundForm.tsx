import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFundStore } from '../store/useFundStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { fundFormSchema, type FundFormData } from "../schemas/fundFormSchema"

export function FundForm() {
  const { toast } = useToast()
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContext, useState } from 'react';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import SmartContractContext from '@/contexts/components/SmartContractContext';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import LucidContext from '@/contexts/components/LucidContext';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import WalletContext from '@/contexts/components/WalletContext';
import * as z from 'zod';

export type FundFormData = z.infer<typeof formSchema>;

export function FundForm() {
  const { toast } = useToast();
  const { createFund } =
    useContext<SmartContractContextType>(SmartContractContext);
  const { lucidPlatform } = useContext<LucidContextType>(LucidContext);
  const { wallet } = useContext<WalletContextType>(WalletContext);
  const [imagePreview, setImagePreview] = useState<string>(''); // State for image preview
  const [imageFile, setImageFile] = useState<File | null>(null);




  const addFund = useFundStore((state) => state.addFund)
  const navigate = useNavigate()

  const handleCreateFund = async (data: FundFormData) => {
    try {
      console.log('Form Data:', data);
      await createFund({
        fundOwner: wallet.publicKeyHash,
        fundMetadata: data,
      });
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Fund registered successfully!',
      });
      // navigate(`/fund/${fund.id}`);

    } catch (error) {
      console.error('Create Fund Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register fund. Please try again.",
      })
    }
  }


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const review = URL.createObjectURL(file);
      setImagePreview(review);

      console.log(review);

      // Cập nhật giá trị của trường 'image' trong form
      form.setValue('image', review);
    }
  };

  const beforeSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    form: UseFormReturn<FundFormData>
  ) => {
    e.preventDefault();
    console.log('beforeSubmit: ', form.watch());
    // form.handleSubmit(handleCreateFund)
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Organization Information */}
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter organization name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The official name of your organization
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl className="w-full block">
                        <Input type="date" {...field} />

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl className="w-full block">
                        <Input type="date" {...field} />

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="imagePreview">
                      <p className="mb-4">Image</p>
                      <div className="border-dashed border-2 p-2 h-[200px] rounded-md border-muted-foreground h-[200px] flex justify-center items-center cursor-pointer">
                        {!imagePreview ? (
                          <p className="text-sm text-muted-foreground">
                            Click to upload an image
                          </p>
                        ) : (
                          <div className="h-full w-full">
                            <img
                              src={imagePreview}
                              alt="Image Preview"
                              className="w-full h-full object-cover rounded-md block"
                            />
                          </div>
                        )}
                      </div>
                    </FormLabel>

                    <FormControl>
                      <Input
                        id="imagePreview"
                        type="file"
                        // {...field}
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                        className="hidden"
                      />
                    </FormControl>

                    <FormDescription>
                      The image that will be displayed for your campaign
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="organizationInfo.socialInfo.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Facebook URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationInfo.socialInfo.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Twitter URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationInfo.socialInfo.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationInfo.socialInfo.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Information */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                    <FormLabel>Target Amount (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={100}
                        step="0.01"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum $100, maximum $1,000,000
                    </FormDescription>
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
                        <option value="Community Development">Community Development</option>
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
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Cardano wallet address for receiving funds
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

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
              "Register Fund"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}