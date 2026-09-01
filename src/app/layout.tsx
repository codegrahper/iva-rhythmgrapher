import type { Metadata } from 'next';
import './globals.css';
import { siteMetadata } from '@/content';

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: 'website',
    locale: 'ko_KR',
    siteName: 'RHYTHMGRAPHER',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
