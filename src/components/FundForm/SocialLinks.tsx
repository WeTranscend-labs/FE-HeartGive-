import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FundFormData } from "@/schemas/fundFormSchema";

interface SocialLinksProps {
    form: UseFormReturn<FundFormData>;
}

export function SocialLinks({ form }: SocialLinksProps) {
    return (
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
    );
}