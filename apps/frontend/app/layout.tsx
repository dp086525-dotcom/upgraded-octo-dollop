import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Life Tracker',
  description: 'Manage B.Tech study, exams, gym, nutrition, streaks, and reminders.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
