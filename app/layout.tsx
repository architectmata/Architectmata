import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: {
    default: 'Architectmata - Kids books, family finds & ShopMy picks',
    template: '%s | Architectmata',
  },
  description:
    'Thoughtful kids books, art supplies, family travel helpers, and product recommendations curated for parents from Architectmata.',
  openGraph: {
    title: 'Architectmata Shop Guide',
    description: 'Kids books, family finds, and ShopMy quick links for curious families.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <svg className="absolute h-0 w-0">
          <filter id="wobble">
            <feTurbulence baseFrequency="0.02" numOctaves="2" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
