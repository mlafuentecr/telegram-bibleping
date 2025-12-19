// src/app/layout.tsx
import type { Metadata } from 'next';
import React from 'react';
import './globals.scss';

export const metadata: Metadata = {
  title: 'BiblePing',
  description: 'Daily Bible verse with beautiful backgrounds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
