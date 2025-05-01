'use client';

import { useSignInForm } from '@/features/auth/hooks/useSignInForm';
import { OAuthButton, AuthForm } from '@/features/auth/components';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';

type SignInPopupProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
};

export const SignInPopup = ({ isOpen, onOpenChange, trigger }: SignInPopupProps) => {
  const { form, handleSubmit, isPending, error, success } = useSignInForm();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Sign In</DialogTitle>
        </DialogHeader>

        <AuthForm.Wrapper form={form}>
          <AuthForm.Container onSubmit={handleSubmit}>
            <div className="space-y-4">
              <OAuthButton provider="github" />

              <AuthForm.Status error={error} success={success} />
            </div>
          </AuthForm.Container>
        </AuthForm.Wrapper>
      </DialogContent>
    </Dialog>
  );
};
