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
import { Loader2, Plus, ArrowRight, DollarSign, CalendarIcon, FileText, Building2 } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePostTransactions, useGetTransactions } from '@/api/generated/ledgerAPI';

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
  isLoading?: boolean;
  onSuccess?: () => void;
}

export const TransactionForm = ({ isLoading = false, onSuccess }: TransactionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Orval-generated hooks for API integration and SWR cache
  const { trigger: createTransaction } = usePostTransactions();
  const { data: transactions, mutate } = useGetTransactions();

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
      date: new Date().toISOString(),
    },
  });

  const debitAccount = watch('debitAccount');
  const creditAccount = watch('creditAccount');

  // Optimistic update and API integration
  const handleFormSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    setError(null);

    // 1. Create an optimistic transaction
    const optimisticTransaction = {
      id: `temp-${Date.now()}`,
      ...data,
    };

    // 2. Optimistically update the UI
    mutate([...(transactions || []), optimisticTransaction], false);

    try {
      // 3. Call the API
      const created = await createTransaction(data);

      // 4. Replace the optimistic transaction with the real one
      const filtered = (transactions || []).filter(t => !t.id?.startsWith('temp-'));
      mutate([...filtered, created], false);

      reset();
      setSelectedDate(new Date());
      if (onSuccess) onSuccess(); // Only call the callback
    } catch (error) {
      // 5. Revert the optimistic update
      mutate(transactions, false);
      
      // Provide more specific error messages
      console.error('Transaction creation failed:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
          setError("Network error: Unable to connect to server. This is a demo application - in production, this would connect to a live backend API.");
        } else if (error.message.includes('404')) {
          setError("API endpoint not found. This is a demo application deployed on Vercel - the backend API is not available in production. In a real application, this would connect to a live backend server.");
        } else if (error.message.includes('500')) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Failed to create transaction: ${error.message}`);
        }
      } else {
        setError("Failed to create transaction. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}

      {/* Development Info */}
      {/* {import.meta.env.DEV && (
        <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <AlertDescription className="text-xs text-blue-700 dark:text-blue-300">
            🧪 Development Mode: Using Mock Service Worker for API calls
          </AlertDescription>
        </Alert>
      )} */}

      {/* Date Selection */}
      <div className="space-y-1">
        <Label htmlFor="date" className="text-xs font-medium flex items-center gap-2">
          {/* <CalendarIcon className="h-4 w-4" /> */}
          Transaction Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={
                "w-full h-9 justify-start text-left font-normal text-xs" +
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
                  setValue('date', date.toISOString());
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
          value={selectedDate ? selectedDate.toISOString() : ''}
        />
        {errors.date && (
          <p className="text-xs text-destructive">{errors.date.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Label htmlFor="description" className="text-xs font-medium flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Description
        </Label>
        <Input
          id="description"
          {...register('description')}
          placeholder="Enter transaction description"
          className="h-9 text-xs"
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Account Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>Account Flow</span>
          <ArrowRight className="h-4 w-4" />
        </div>
        
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="debitAccount" className="text-xs font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Debit Account
            </Label>
            <Select 
              value={debitAccount || ''} 
              onValueChange={(value) => setValue('debitAccount', value)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Select debit account" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((account) => (
                  <SelectItem key={account} value={account} className="text-xs py-1.5">
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.debitAccount && (
              <p className="text-xs text-destructive">{errors.debitAccount.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="creditAccount" className="text-xs font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Credit Account
            </Label>
            <Select 
              value={creditAccount || ''} 
              onValueChange={(value) => setValue('creditAccount', value)}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Select credit account" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((account) => (
                  <SelectItem 
                    key={account} 
                    value={account}
                    disabled={account === debitAccount}
                    className="text-xs py-1.5"
                  >
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.creditAccount && (
              <p className="text-xs text-destructive">{errors.creditAccount.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <Label htmlFor="amount" className="text-xs font-medium flex items-center gap-2">
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
          className="h-9 font-mono text-xs"
        />
        {errors.amount && (
          <p className="text-xs text-destructive">{errors.amount.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full h-9 text-xs touch-manipulation"
        size="default"
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
        <div className="flex items-center gap-2 mb-4">
          <Plus className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Create New Transaction</h3>
        </div>
        <FormContent />
      </CardContent>
    </Card>
  );
}; 