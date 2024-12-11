import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FundFormData } from "@/schemas/fundFormSchema";

interface ImageUploadProps {
    form: UseFormReturn<FundFormData>;
    imagePreview: string;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUpload({ form, imagePreview, onImageChange }: ImageUploadProps) {
    return (
        <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor="imagePreview">
                        <p className="mb-4">Image</p>
                        <div className="border-dashed border-2 p-2 h-[200px] rounded-md border-muted-foreground flex justify-center items-center cursor-pointer">
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
                            accept="image/*"
                            onChange={onImageChange}
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
    );
}