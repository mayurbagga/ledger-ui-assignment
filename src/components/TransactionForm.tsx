import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ACCOUNT_TYPES } from '@/constants/accounts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Loader2, Plus, ArrowRight, DollarSign, CalendarIcon } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const transactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  debitAccount: z.string().min(1, 'Debit account is required'),
  creditAccount: z.string().min(1, 'Credit account is required'),
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
}).refine((data) => data.debitAccount !== data.creditAccount, {
  message: 'Debit and credit accounts must be different',
  path: ['creditAccount'],
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (transaction: TransactionFormData) => Promise<void>;
  isLoading?: boolean;
}

export const TransactionForm = ({ onSubmit, isLoading = false }: TransactionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const debitAccount = watch('debitAccount');
  const creditAccount = watch('creditAccount');

  const handleFormSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(data);
      reset();
      setSelectedDate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Date Selection */}
      <div className="space-y-2">
        <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Transaction Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={
                "w-full h-12 justify-start text-left font-normal" +
                (!selectedDate ? " text-muted-foreground" : "")
              }
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? selectedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
                  setValue('date', date.toISOString().split('T')[0]);
                  setOpen(false);
                }
              }}
              captionLayout="dropdown"
              initialFocus
              className="w-[360px]"
            />
          </PopoverContent>
        </Popover>
        <input
          type="hidden"
          {...register('date')}
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
        />
        {errors.date && (
          <p className="text-sm text-destructive">{errors.date.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Input
          id="description"
          {...register('description')}
          placeholder="Enter transaction description"
          className="h-12 text-base"
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Account Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Account Flow</span>
          <ArrowRight className="h-4 w-4" />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="debitAccount" className="text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Debit Account
            </Label>
            <Select 
              value={debitAccount || ''} 
              onValueChange={(value) => setValue('debitAccount', value)}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select debit account" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((account) => (
                  <SelectItem key={account} value={account} className="text-base py-3">
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.debitAccount && (
              <p className="text-sm text-destructive">{errors.debitAccount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditAccount" className="text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Credit Account
            </Label>
            <Select 
              value={creditAccount || ''} 
              onValueChange={(value) => setValue('creditAccount', value)}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select credit account" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((account) => (
                  <SelectItem 
                    key={account} 
                    value={account}
                    disabled={account === debitAccount}
                    className="text-base py-3"
                  >
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.creditAccount && (
              <p className="text-sm text-destructive">{errors.creditAccount.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-sm font-medium flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          {...register('amount', { valueAsNumber: true })}
          placeholder="0.00"
          className="h-12 font-mono text-base"
        />
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full h-12 text-base touch-manipulation"
        size="lg"
      >
        {isSubmitting || isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Transaction...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Create Transaction
          </>
        )}
      </Button>
    </form>
  );

  if (isMobile) {
    return <FormContent />;
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-6">
        <FormContent />
      </CardContent>
    </Card>
  );
}; 