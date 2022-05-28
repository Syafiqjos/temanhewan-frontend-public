import * as React from 'react';

import Header from '@/components/layout/Header';

import { AuthProvider } from '@/providers/AuthContextProvider';

import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <AuthProvider>
        <Header />
        {children}
        <Footer />
      </AuthProvider>
    </>
  );
}
