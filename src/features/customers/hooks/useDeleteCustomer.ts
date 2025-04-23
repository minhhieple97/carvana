import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { deleteCustomerAction } from '../actions';

export const useDeleteCustomer = () => {
  const { execute, isPending } = useAction(deleteCustomerAction, {
    onSuccess: () => {
      toast.success('Customer deleted successfully');
    },
    onError: (result) => {
      toast.error('Error Deleting Customer', {
        description: result.error.serverError,
      });
    },
  });

  return {
    deleteCustomer: (id: number) => execute({ id }),
    isDeleting: isPending,
  };
};
