import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FundFormData } from "@/schemas/fundFormSchema";

interface DateFieldsProps {
    form: UseFormReturn<FundFormData>;
}

export function DateFields({ form }: DateFieldsProps) {
    return (
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
    );
}