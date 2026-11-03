import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VOGUE — The Art of Dressing Well',
  description: 'Discover considered essentials and modern icons at VOGUE, a contemporary luxury fashion boutique.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
