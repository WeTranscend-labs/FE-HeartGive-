import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import LucidContext from '@/contexts/components/LucidContext';
import ModalContext from '@/contexts/components/ModalContext';
import WalletContext from '@/contexts/components/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { fundFormSchema, type FundFormData } from '@/schemas/fundFormSchema';
import { uploadImageToSupabase } from '@/services/supabase.service';
import { LucidContextType } from '@/types/contexts/LucidContextType';
import { ModalContextType } from '@/types/contexts/ModalContextType';
import { WalletContextType } from '@/types/contexts/WalletContextType';
import { CheckCircle2 } from 'lucide-react';
import { CampaignFields } from './FundForm/CampaignFields';
import { DateFields } from './FundForm/DateFields';
import { ImageUpload } from './FundForm/ImageUpload';
import { OrganizationFields } from './FundForm/OrganizationFields';
import { SocialLinks } from './FundForm/SocialLinks';

export function FundForm() {
  const { toast } = useToast();

  const { lucid } = useContext<LucidContextType>(LucidContext);
  const { wallet } = useContext<WalletContextType>(WalletContext);
  const { toggleShowingWallet } = useContext<ModalContextType>(ModalContext);
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<FundFormData>({
    resolver: zodResolver(fundFormSchema),
    defaultValues: {
      organizationName: '',
      startDate: '',
      endDate: '',
      image: '',
      organizationInfo: {
        socialInfo: {
          facebook: '',
          twitter: '',
          phone: '',
          email: '',
        },
      },
      purpose: '',
      targetAmount: 100,
      walletAddress: '',
      fundAddress: '',
      category: 'Education',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // File validation
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: 'Image must be less than 10MB',
        });
        return;
      }

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Only JPEG, PNG, GIF, and WebP are allowed',
        });
        return;
      }

      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      form.setValue('image', preview);
    }
  };

  const onSubmit = async (data: FundFormData) => {
    // Check if wallet is connected
    if (!wallet || !lucid) {
      toast({
        variant: 'destructive',
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to create a fund',
      });
      toggleShowingWallet(); // Show wallet connection modal
      return;
    }
    let imageUrl = null;

    try {
      // Hiển thị toast loading
      if (imageFile) {
        imageUrl = await uploadImageToSupabase(imageFile);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      // Update data with image URL
      // Cập nhật toast thành công với màu xanh lá
      toast({
        variant: 'success',
        title: 'Fund Created Successfully!',
        description: `"${data.organizationName}" is live soon`,
        icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      });

      // Cleanup
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview('');
      setImageFile(null);
      form.reset();

      // Navigate to funds page
      navigate('/funds');
    } catch (error) {
      console.error('Create Fund Error:', error);
      toast({
        variant: 'destructive',
        title: 'Fund Creation Failed',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to create fund. Please try again.',
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
              'Register Fund'
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
