import type { Metadata } from 'next';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { Roboto, Open_Sans } from 'next/font/google';
import { Providers } from '@/providers';
import { InitialAuthProvider } from '@/providers/InitialAuthProvider';
import { Toaster } from '@/components/ui/sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConditionalWrapper from '../components/ConditionalWrapper';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HomeSpace - Find Your Perfect Home',
  description: 'HomeSpace helps you find your perfect home with listings from trusted agencies.',
  keywords: ['real estate', 'property', 'homes', 'apartments', 'agencies'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('hs_auth');
  let initialAuth = { isAuthenticated: false, hasAgency: false, displayName: '' };
  if (authCookie) {
    try {
      const data = JSON.parse(decodeURIComponent(authCookie.value));
      initialAuth = {
        isAuthenticated: true,
        hasAgency: !!data.ag,
        displayName: data.fn && data.ln ? `${data.fn} ${data.ln}` : '',
      };
    } catch {
      initialAuth = { isAuthenticated: true, hasAgency: false, displayName: '' };
    }
  }

  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <InitialAuthProvider value={initialAuth}>
          <Providers>
            <ConditionalWrapper>
              <Suspense fallback={null}>
                <Header />
              </Suspense>
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </ConditionalWrapper>
            <Toaster />
          </Providers>
        </InitialAuthProvider>
      </body>
    </html>
  );
}
