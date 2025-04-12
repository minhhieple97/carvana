import { PublicLayout } from '@/components';
import { SignUpForm } from '@/features/auth/components/sign-up-form';

export default function SignUpPage() {
  return (
    <PublicLayout>
      <SignUpForm />
    </PublicLayout>
  );
}
