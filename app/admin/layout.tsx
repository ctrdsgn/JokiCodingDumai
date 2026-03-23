import { ReactNode } from 'react';
import { AdminSidebar, AdminHeader } from '../components/admin';
import { AdminSessionProvider } from '../components/admin/AdminSessionProvider';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminSessionProvider>
      <div className="min-h-screen bg-gray-950">
        <AdminSidebar />
        <div className="ml-64">
          <AdminHeader title="Admin Dashboard" />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AdminSessionProvider>
  );
}
