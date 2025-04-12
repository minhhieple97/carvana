import { PublicLayout } from '@/components';
import { SignInForm } from '@/features/auth/components/sign-in-form';

export default function SignInPage() {
  return (
    <PublicLayout>
      <SignInForm />
    </PublicLayout>
  );
}
