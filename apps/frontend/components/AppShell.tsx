import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="w-full px-4 py-6 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}
