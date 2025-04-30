'use client';

import { useSignInForm } from '@/features/auth/hooks/useSignInForm';
import { OAuthButton } from '@/features/auth/components/oauth-button';
import { AuthForm } from '@/features/auth/components/auth-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
