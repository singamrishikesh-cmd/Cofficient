import { Inter } from 'next/font/google';
import './globals.css';
import AppBackground from '../components/layout/AppBackground';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <AppBackground />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
