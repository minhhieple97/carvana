import { useSearchParams } from 'next/navigation';

export const useFormHeader = () => {
  const params = useSearchParams();
  const steps = [
    { id: '1', title: 'Welcome' },
    { id: '2', title: 'Select Handover Date' },
    { id: '3', title: 'Submit Details' },
  ];

  return {
    params,
    steps,
  };
};
