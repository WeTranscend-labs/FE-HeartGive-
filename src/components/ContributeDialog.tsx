import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TransactionForm } from "./TransactionForm"
import { formatCurrency } from "@/utils/format"

interface ContributeDialogProps {
    fundId: string
    currentAmount: number
    targetAmount: number
}

export function ContributeDialog({ fundId, currentAmount, targetAmount }: ContributeDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full text-lg py-6" size="lg">
                    Contribute Now
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Make a Contribution</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div className="flex justify-between items-baseline mb-4 text-sm text-gray-600">
                        <span>Current Amount</span>
                        <span className="font-medium">{formatCurrency(currentAmount)}</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-6 text-sm text-gray-600">
                        <span>Target Amount</span>
                        <span className="font-medium">{formatCurrency(targetAmount)}</span>
                    </div>
                    <TransactionForm fundId={fundId} />
                </div>
            </DialogContent>
        </Dialog>
    )
}