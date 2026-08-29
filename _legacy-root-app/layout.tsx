import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: {
    default: 'Architectmata — Architecture, books & wonder',
    template: '%s | Architectmata',
  },
  description:
    'A Conservation Architect, educator, and mother exploring how children connect with books, architecture, art, travel, and heritage.',
  openGraph: {
    title: 'Architectmata',
    description: 'Architecture, books, art, and small adventures for curious children.',
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
