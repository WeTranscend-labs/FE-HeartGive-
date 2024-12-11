import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContext, useState } from 'react';
import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import SmartContractContext from '@/contexts/components/SmartContractContext';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import LucidContext from '@/contexts/components/LucidContext';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import WalletContext from '@/contexts/components/WalletContext';
import { fundFormSchema, type FundFormData } from '@/schemas/fundFormSchema';
import { ImageUpload } from './FundForm/ImageUpload';
import { SocialLinks } from './FundForm/SocialLinks';
import { DateFields } from './FundForm/DateFields';
import { OrganizationFields } from './FundForm/OrganizationFields';
import { CampaignFields } from './FundForm/CampaignFields';

export function FundForm() {
  const { toast } = useToast();
  const { createFund } = useContext<SmartContractContextType>(SmartContractContext);
  const { lucidPlatform } = useContext<LucidContextType>(LucidContext);
  const { wallet } = useContext<WalletContextType>(WalletContext);
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<FundFormData>({
    resolver: zodResolver(fundFormSchema),
    defaultValues: {
      organizationName: "",
      startDate: "",
      endDate: "",
      image: "",
      organizationInfo: {
        socialInfo: {
          facebook: "",
          twitter: "",
          phone: "",
          email: ""
        }
      },
      purpose: "",
      targetAmount: 100,
      walletAddress: "",
      category: "Education"
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      form.setValue('image', preview);
    }
  };

  const onSubmit = async (data: FundFormData) => {
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

      // Clean up the object URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // navigate(`/fund/${fund.id}`);
    } catch (error) {
      console.error('Create Fund Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register fund. Please try again.",
      });
    }
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
              <OrganizationFields form={form} />
              <DateFields form={form} />
              <ImageUpload
                form={form}
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
              />
              <SocialLinks form={form} />
            </CardContent>
          </Card>

          {/* Campaign Information */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CampaignFields form={form} />
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
  );
}