'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface AdminSessionProviderProps {
  children: ReactNode;
}

export function AdminSessionProvider({ children }: AdminSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
