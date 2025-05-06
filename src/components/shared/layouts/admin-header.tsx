import { AdminSearch } from '@/features/admin';
import { UserAvatarWrapper } from '@/features/auth/components/user-avatar-wrapper';
import { ThemeToggle } from '../theme-toggle';

export const AdminHeader = async () => (
  <header className="flex h-[60px] items-center justify-between px-6">
    <div className="w-full max-w-md">
      <AdminSearch />
    </div>
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <UserAvatarWrapper />
    </div>
  </header>
);
