import './globals.css';
import { AuthProvider } from '../context/auth-context';
import { RoleMenu } from '../components/role-menu';
import { ThemeToggle } from '../components/theme-toggle';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-zinc-900 dark:text-zinc-100">
        <AuthProvider>
          <header className="flex items-center justify-between border-b p-4">
            <RoleMenu />
            <ThemeToggle />
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
