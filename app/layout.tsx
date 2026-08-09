import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Yeşil Toprak Peyzaj | Doğal Tasarım, Profesyonel Uygulama',
  description:
    'Konut ve ticari peyzaj tasarımı, sert peyzaj, sulama sistemleri, bahçe bakımı ve aydınlatma. 15 yıllık deneyimle doğayla buluşan mekanlar.',
  openGraph: {
    title: 'Yeşil Toprak Peyzaj',
    description: 'Doğal tasarım, profesyonel uygulama.',
    images: [
      {
        url: 'https://images.pexels.com/photos/8082322/pexels-photo-8082322.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
