import { AdminSearch } from '@/features/admin';
import { ThemeToggle } from '../theme-toggle';

export const AdminHeader = async () => (
  <header className="flex h-[60px] items-center justify-between px-6">
    <div className="w-full max-w-md">
      <AdminSearch />
    </div>
    <div className="ml-4">
      <ThemeToggle />
    </div>
  </header>
);
