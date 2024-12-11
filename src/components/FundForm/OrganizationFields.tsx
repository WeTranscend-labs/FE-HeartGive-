import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FundFormData } from "@/schemas/fundFormSchema";

interface OrganizationFieldsProps {
    form: UseFormReturn<FundFormData>;
}

export function OrganizationFields({ form }: OrganizationFieldsProps) {
    return (
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
    );
}