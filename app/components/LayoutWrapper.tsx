'use client';

import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
