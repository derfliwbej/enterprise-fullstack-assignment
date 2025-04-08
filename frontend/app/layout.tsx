import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/lib/queryClient';
import { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chartmetric Assignment',
  authors: [
    { name: 'Jeb Wilfred Panganiban', url: 'https://www.jwdpanganiban.com' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className="dark" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
