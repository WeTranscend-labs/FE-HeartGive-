import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useFundStore } from "../store/useFundStore"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  amount: z.number()
    .min(5, "Minimum amount is 5 ADA")
    .max(1000000, "Maximum amount is 1,000,000 ADA"),
  fromWallet: z.string()
    .regex(/^addr1[a-zA-Z0-9]{98}$/, "Invalid Cardano wallet address"),
})

type FormData = z.infer<typeof formSchema>

interface TransactionFormProps {
  fundId: string;
}

export function TransactionForm({ fundId }: TransactionFormProps) {
  const { toast } = useToast()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 5,
      fromWallet: "",
    },
  })

  const addTransaction = useFundStore((state) => state.addTransaction)

  const onSubmit = async (data: FormData) => {
    try {
      addTransaction({
        ...data,
        fundId,
      })
      toast({
        variant: "success",
        title: "Success",
        description: "Contribution added successfully!",
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process contribution. Please try again.",
      })
    }
  }

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
                    <FormLabel>Amount (ADA)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₳</span>
                        </div>
                        <Input
                          type="number"
                          min={5}
                          step="1"
                          className="pl-7"
                          {...field}
                          onChange={event => field.onChange(+event.target.value)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the amount you wish to contribute in ADA
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fromWallet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Wallet</FormLabel>
                    <FormControl>
                      <Input placeholder="addr1..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Cardano wallet address
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
                  "Contribute"
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </CardContent>
    </Card>
  )
}