import { AdminSidebar } from '@/components';
import { AdminHeader } from '@/components/shared/layouts/admin-header';
import { AI } from '@/features/admin/actions/ai';

import type { PropsWithChildren } from 'react';

export default async function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AI>
      <div className="dark flex bg-background min-h-screen w-full text-foreground">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <main className="admin-scrollbar flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AI>
  );
}
